import { NextResponse } from 'next/server'
import { verifyOTP } from '@/lib/otp'
import { verifyOTP as verifyOTPRedis } from '@/lib/redis'

export async function POST(request: Request) {
    try {
        const { identifier, code } = await request.json()

        if (!identifier || !code) {
            return NextResponse.json(
                { success: false, message: 'Identifier and code are required' },
                { status: 400 }
            )
        }

        let isValid = false
        let errorMsg = 'Invalid OTP'

        // Verify OTP (Try Redis first, fallback to memory)
        if (process.env.REDIS_URL) {
            const result = await verifyOTPRedis(identifier, code)
            isValid = result.valid
            if (result.error) errorMsg = result.error
        } else {
            const result = verifyOTP(identifier, code)
            isValid = result.valid
            if (result.error) errorMsg = result.error
        }

        if (isValid) {
            // In a real app, you would create a session here
            // For now, we just return success
            return NextResponse.json({ success: true })
        } else {
            return NextResponse.json(
                { success: false, message: errorMsg },
                { status: 400 }
            )
        }

    } catch (error) {
        console.error('Error verifying OTP:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
