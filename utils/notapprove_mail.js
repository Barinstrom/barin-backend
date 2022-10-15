const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
require("dotenv").config();

let transporter = nodemailer.createTransport({
   host: "smtp.office365.com",
   auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
   },
});

const handlebarOptions = {
   viewEngine: {
      partialsDir: path.resolve("./utils/htmlTemplate/"),
      defaultLayout: false,
   },
   viewPath: path.resolve("./utils/htmlTemplate/"),
};

transporter.use("compile", hbs(handlebarOptions));

const notapprove_mail = async (tomail, toname, msg) => {
   await transporter.sendMail(
      {
         from: "Barin Admin <barinschool@hotmail.com>",
         to: `${toname} <${tomail}>`,
         subject: "Your school is not approved",
         template: "notapprove",
         context: {
            toname: toname,
            msg: msg,
         },
      },
      (err, info) => {
         if (err) {
            console.log(err);
         } else {
            console.log(info.messageId);
         }
      }
   );
   await transporter.close();
};

module.exports = notapprove_mail;
