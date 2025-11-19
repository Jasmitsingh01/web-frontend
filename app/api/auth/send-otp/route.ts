import { NextResponse } from 'next/server'
import { generateOTP, storeOTP } from '@/lib/otp'
import { storeOTP as storeOTPRedis } from '@/lib/redis'
import { sendEmail } from '@/lib/services/email'
import { sendEmailSendGrid } from '@/lib/services/sendgrid'
import { sendSMS } from '@/lib/services/sms'
import { sendSMSTwilio } from '@/lib/services/twilio'
import { detectInputType, sanitizePhone } from '@/lib/validators'

export async function POST(request: Request) {
    try {
        const { identifier } = await request.json()

        if (!identifier) {
            return NextResponse.json(
                { success: false, message: 'Identifier is required' },
                { status: 400 }
            )
        }

        const type = detectInputType(identifier)

        if (type === 'unknown') {
            return NextResponse.json(
                { success: false, message: 'Invalid email or phone number' },
                { status: 400 }
            )
        }

        // Generate OTP
        const otp = generateOTP()

        // Store OTP (Try Redis first, fallback to memory)
        if (process.env.REDIS_URL) {
            await storeOTPRedis(identifier, otp)
        } else {
            storeOTP(identifier, otp)
        }

        // Send OTP
        let sent = false
        if (type === 'email') {
            // Try SendGrid if API key exists, otherwise use mock
            if (process.env.SENDGRID_API_KEY) {
                sent = await sendEmailSendGrid({
                    to: identifier,
                    subject: 'Your Verification Code',
                    html: `<p>Your verification code is: <strong>${otp}</strong></p><p>This code will expire in 10 minutes.</p>`
                })
            } else {
                sent = await sendEmail({
                    to: identifier,
                    subject: 'Your Verification Code',
                    html: `<p>Your verification code is: <strong>${otp}</strong></p>`
                })
            }
        } else {
            const phone = sanitizePhone(identifier)
            // Try Twilio if credentials exist, otherwise use mock
            if (process.env.TWILIO_ACCOUNT_SID) {
                sent = await sendSMSTwilio(
                    phone,
                    `Your verification code is: ${otp}`
                )
            } else {
                sent = await sendSMS(phone, `Your verification code is: ${otp}`)
            }
        }

        if (sent) {
            return NextResponse.json({ success: true })
        } else {
            return NextResponse.json(
                { success: false, message: 'Failed to send OTP' },
                { status: 500 }
            )
        }

    } catch (error) {
        console.error('Error sending OTP:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
