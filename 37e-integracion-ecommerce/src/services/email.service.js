import nodemailer from 'nodemailer';
import config from '../config.js';

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.user_email,
                pass: config.user_pass
            },
        })
    }

    sendEmail(to, subject, html, attachments = []) {
        return this.transporter.sendMail({
            from: config.user_email,
            to,
            subject,
            html,
            attachments,
        })
    }
}

export default new EmailService();
