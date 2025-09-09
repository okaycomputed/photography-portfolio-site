import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        
        return res.status(204).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ status: "error", message: "Method not allowed" });
    }

    const {firstName, lastName, email, message} = req.body;

    const sanitizedFirstName = String(firstName).trim();
    const sanitizedLastName = String(lastName).trim();
    const sanitizedEmail = String(email).trim();
    const sanitizedMessage = String(message).trim();

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    try {
        await transporter.sendMail({
            from: `"Portfolio Website" <${process.env.SMTP_USERNAME}>`,
            to: process.env.EMAIL,
            replyTo: {
                name: `${sanitizedFirstName} ${sanitizedLastName}`,
                address: sanitizedEmail,
            },
            subject: "Inquiry From Portfolio Website",
            html: sanitizedMessage,
        });

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).json({status: "success"});
    } 

    catch (err) {
        console.error("Error sending email:", err);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(500).json({status: "error"});
    }
}
