
import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"TekzoBD" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });

  console.log("Email sent: %s", info.messageId);
};