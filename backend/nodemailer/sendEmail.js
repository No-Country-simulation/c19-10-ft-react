const nodemailer = require("nodemailer");
require("dotenv").config();
const hbs = require("nodemailer-express-handlebars");

const sendEmailFunction = ({ email, subject, template, context }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      defaultLayout: false,
    },
    viewPath: "views/",
  };

  transporter.use("compile", hbs(handlebarOptions));

  const message = {
    from: process.env.SMTP_USER,
    to: email,
    subject: subject,
    template: template,
    context,
  };

  return transporter.sendMail(message);
};

module.exports = {
  sendEmailFunction,
};
