
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); 

const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST || "smtp.mailtrap.io",
    port: process.env.MAILTRAP_PORT || 2525,
    auth: {
        user: process.env.MAILTRAP_USER, 
        pass: process.env.MAILTRAP_PASS  
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Error configuring Nodemailer transporter:', error);
    } else {
        console.log('Nodemailer transporter is configured successfully.');
    }
});

export default transporter;
