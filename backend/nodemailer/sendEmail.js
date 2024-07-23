const nodemailer = require("nodemailer")
require("dotenv").config()
const { User } = require("../models/initModels")

const sendEmailFunction = (email, name) => {

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
        subject: "Welcome to Celebria.",
        text: `Hello, ${name}, \n\Welcome to our platform! We invite you to create your first event. \n\Our team is excited to see those videos and photos\n\nThank you for joining us! `
    }

    return transporter.sendMail(message);
}

module.exports = {
    sendEmailFunction
}