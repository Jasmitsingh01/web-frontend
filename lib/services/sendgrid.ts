import sgMail from '@sendgrid/mail'

// Initialize SendGrid with API key if available
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

interface EmailOptions {
    to: string
    subject: string
    html: string
}

export async function sendEmailSendGrid(options: EmailOptions): Promise<boolean> {
    if (!process.env.SENDGRID_API_KEY) {
        console.warn('SENDGRID_API_KEY is not set. Email not sent.')
        return false
    }

    try {
        await sgMail.send({
            to: options.to,
            from: process.env.EMAIL_FROM || 'noreply@yourdomain.com', // Change this to your verified sender
            subject: options.subject,
            html: options.html,
        })
        return true
    } catch (error) {
        console.error('Error sending email via SendGrid:', error)
        return false
    }
}
