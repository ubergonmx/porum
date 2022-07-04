import nodemailer from "nodemailer";

/**
 * Send an email
 * @param {string} email 
 * @param {string} subject 
 * @param {string} text 
 */
export const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            secureConnection: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                ciphers:'SSLv3'
            }
        });

        await transporter.sendMail({
            from: "Porum <notification-noreply@porum.com>",
            to: email,
            subject: subject,
            text: text,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.log(error, "Email not sent");
    }
};
