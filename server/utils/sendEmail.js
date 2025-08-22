import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendResetEmail = async (to, resetUrl) => {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure, // true for 465, false for other ports
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    const info = await transporter.sendMail({
        from: '"Precised Talent" <no-reply@precisedtalent.com>',
        to,
        subject: 'Reset your password',
        html: `
      <p>You requested a password reset.</p>
      <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
      <p>This link is valid for 15 minutes.</p>
    `,
    });

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};


export default sendResetEmail;