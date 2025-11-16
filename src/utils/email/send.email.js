import nodemailer from "nodemailer";

export const sendEmail = async({to="",cc="",bcc="",subject="",text="",html="",attachments=[]} = {}) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        },
    });

    const info = await transporter.sendMail({
        from: `"Maddison Foo Koch" <${process.env.EMAIL}>`,
        to,cc,bcc,subject,text,html,attachments
    });
    return info
}

