// Mock SMS Service (replace with real service in production)

/**
 * Send SMS (mock implementation for development)
 * In production, replace with Twilio, AWS SNS, etc.
 */
export async function sendSMS(phone: string, message: string): Promise<boolean> {
    console.log('📱 ===== SMS SENT =====')
    console.log('To:', phone)
    console.log('Message:', message)
    console.log('======================')

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return true
}

/**
 * Send OTP SMS
 */
export async function sendOTPSMS(phone: string, otp: string): Promise<boolean> {
    const message = `Your Trading Platform verification code is: ${otp}. This code expires in 10 minutes. Do not share this code with anyone.`

    return sendSMS(phone, message)
}
