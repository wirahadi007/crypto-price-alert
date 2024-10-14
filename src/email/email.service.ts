import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST, // Mailtrap SMTP host
            port: process.env.EMAIL_PORT, // Port (Mailtrap Sandbox uses 2525 by default)
            auth: {
                user: process.env.EMAIL_USER, // Your Mailtrap username
                pass: process.env.EMAIL_PASSWORD, // Your Mailtrap password (replace with actual value)
            },
        });
    }

    async sendEmail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: 'cepija3@gmail.com', // Make sure to set a valid sender
            to,
            subject,
            text,
        };
        console.log('Sending email with the following details:', mailOptions);

        try {
            const result = await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', result);
            return result;
        } catch (error) {
            console.error('Error while sending email:', error);
            throw error;
        }
    }
}
