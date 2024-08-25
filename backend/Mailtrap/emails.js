
import transporter from './mailer.js';
import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplate.js';

export const sendVerificationEmail = async (email, verificationToken) => {
    const mailOptions = {
        from: 'no-reply@prakashreddydomain.com', 
        to: email,
        subject: 'Verify your email',
        html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
        category: 'EMAIL VERIFICATION'
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully:', info.messageId);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error(`Error sending verification email: ${error.message}`);
    }
};
