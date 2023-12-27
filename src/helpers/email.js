const nodemailer = require("nodemailer");
const {smtpUsername, smtpPassword} = require("../secret");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: smtpUsername,
        pass: smtpPassword,
    },
});

const emailWithNodeMailer = async (emailData) => {
    try {
        const mailOptions = {
            from: smtpUsername, // sender address
            to: emailData.email, // list of receivers
            subject: emailData.subject, // Subject line
            html: emailData.html, // html body
        }

        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent: ', info.response)
    } catch (error){
        console.log('Email sending error: ', error)
        throw error;
    }

}

module.exports = emailWithNodeMailer