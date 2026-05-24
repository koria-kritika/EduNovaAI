import nodemailer from 'nodemailer'

const sendMail = async (toEmail, otp) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    })

    const mailOptions = {
        from: `"EduNovaAI" <${process.env.USER_EMAIL}>`,
        to: toEmail,
        subject: 'Your Password Reset OTP — EduNovaAI',
        html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; background: #0F172A; border-radius: 16px; overflow: hidden; border: 1px solid rgba(59,130,246,0.2);">
            
            <div style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); padding: 32px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                    EduNovaAI
                </h1>
                <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">
                    Password Reset Request
                </p>
            </div>

            <div style="padding: 32px;">
                <p style="color: #94A3B8; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
                    We received a request to reset your password. Use the OTP below to proceed. 
                    This OTP is valid for <strong style="color: #E2E8F0;">5 minutes</strong>.
                </p>

                <div style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
                    <p style="color: #94A3B8; font-size: 13px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">
                        Your OTP
                    </p>
                    <h2 style="color: #3B82F6; font-size: 42px; font-weight: 800; margin: 0; letter-spacing: 8px;">
                        ${otp}
                    </h2>
                </div>

                <p style="color: #64748B; font-size: 13px; line-height: 1.6; margin: 0;">
                    If you did not request a password reset, you can safely ignore this email. 
                    Your account will remain secure.
                </p>
            </div>

            <div style="padding: 20px 32px; border-top: 1px solid rgba(59,130,246,0.1); text-align: center;">
                <p style="color: #475569; font-size: 12px; margin: 0;">
                    © ${new Date().getFullYear()} EduNovaAI · All rights reserved
                </p>
            </div>
        </div>
        `
    }

    await transporter.sendMail(mailOptions)
}

export default sendMail