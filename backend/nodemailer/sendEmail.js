const nodemailer = require("nodemailer")
require("dotenv").config()
const { User } = require("../models/initModels")

const sendEmailFunction = (email, subject, text) => {

    const transporter = nodemailer.createTransport({

        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const message = {
        from: process.env.SMTP_USER,
        to: email, //se toma desde el modelo user
        subject: subject, 
        text: text,
    }

    return transporter.sendMail(message);
}

module.exports = {
    sendEmailFunction
}