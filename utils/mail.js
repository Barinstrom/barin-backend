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

const sender = async (tomail, toname, confirmationCode) => {
   await transporter.sendMail(
      {
         from: "Barin Admin <barinschool@hotmail.com>",
         to: `${toname} <${tomail}>`,
         subject: "Activatate your account",
         template: "activate_admin",
         context: {
            toname: toname,
            WEB_URL: process.env.WEB_URL_FRONT,
            confirmationCode: confirmationCode,
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

module.exports = {
   sender,
};
