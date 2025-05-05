import dotenv from 'dotenv'
import { transporter } from "../config/nodemailer"
dotenv.config()

type EmailType = {
    email: string,
    name: string,
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async(user: EmailType) => {
        await transporter.sendMail({
            from: 'Balancefy <josh.araya.developer@gmail.com>',
            to: user.email,
            subject: 'Balancefy - Confirm your Account',
            text: 'Balancefy - Confirm your Account',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px; color: #333;">
                    <p style="font-size: 16px;">Hello <strong>${user.name}</strong>, your account has been successfully created in <strong>Balancefy</strong>.</p>

                    <h3 style="font-size: 18px; margin-top: 20px;">
                        Please confirm your account:
                        <a href="${process.env.FRONTEND_URL}/auth/confirm-account?token=${user.token}" 
                        style="display: inline-block; margin-top: 10px; padding: 10px 15px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">
                        Confirm Account
                        </a>
                    </h3>
                </div>
            `
        })
    }

    static sendPasswordResetEmail = async(user: EmailType) => {
        await transporter.sendMail({
            from: 'Balancefy <josh.araya.developer@gmail.com>',
            to: user.email,
            subject: 'Balancefy - Reset your Password',
            text: 'Balancefy - Reset your Password',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px; color: #333;">
                    <p style="font-size: 16px;">Hello <strong>${user.name}</strong>, reset your password of <strong>Balancefy</strong>.</p>

                    <h3 style="font-size: 18px; margin-top: 20px;">
                        Reset your password:
                        <a href="${process.env.FRONTEND_URL}/auth/reset-password" 
                        style="display: inline-block; margin-top: 10px; padding: 10px 15px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">
                        Reset Password
                        </a>
                    </h3>
                    
                    <p style="font-size: 16px; margin-top: 20px;">
                        Enter the following code: <strong>${user.token}</strong>
                    </p>
                </div>
            `
        })
    }
}