import twilio from 'twilio'

// Initialize Twilio client if credentials are available
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

let client: twilio.Twilio | null = null

if (accountSid && authToken) {
    client = twilio(accountSid, authToken)
}

export async function sendSMSTwilio(to: string, body: string): Promise<boolean> {
    if (!client || !twilioPhoneNumber) {
        console.warn('Twilio credentials or phone number not set. SMS not sent.')
        return false
    }

    try {
        await client.messages.create({
            body,
            from: twilioPhoneNumber,
            to,
        })
        return true
    } catch (error) {
        console.error('Error sending SMS via Twilio:', error)
        return false
    }
}
