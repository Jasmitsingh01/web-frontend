// Mock Email Service (replace with real service in production)

interface EmailOptions {
    to: string
    subject: string
    html: string
}

/**
 * Send email (mock implementation for development)
 * In production, replace with SendGrid, AWS SES, Resend, etc.
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
    console.log('📧 ===== EMAIL SENT =====')
    console.log('To:', options.to)
    console.log('Subject:', options.subject)
    console.log('Body:', options.html)
    console.log('========================')

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return true
}

/**
 * Send OTP email
 */
export async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 20px; background: white; border-radius: 8px; margin: 20px 0; color: #a855f7; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Trading Platform</h1>
            <p>Your verification code</p>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Your one-time password (OTP) for signing in is:</p>
            <div class="otp-code">${otp}</div>
            <p>This code will expire in <strong>10 minutes</strong>.</p>
            <p>If you didn't request this code, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>© 2025 Trading Platform. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `

    return sendEmail({
        to: email,
        subject: 'Your Trading Platform Verification Code',
        html,
    })
}
