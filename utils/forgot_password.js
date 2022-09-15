const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
   host: "smtp.office365.com",
   auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
   },
});

const forgot_pass = (tomail, toname, resetCode) => {
   transporter.sendMail(
      {
         from: "Barin Admin <barinschool@hotmail.com>",
         to: `${toname} <${tomail}>`,
         subject: "Reset Password",
         html: `<h1>Email reset</h1>
        <h2>Hello ${toname}</h2>
        <p>Please enter the link to reset your password</p>
        <p>Link will expired next 15 minutes.</p>
        <a href=${process.env.WEB_URL_FRONT}/resetPass?token=${resetCode}> Click here</a>
        </div>`,
      },
      (err, info) => {
         if (err) {
            console.log(err);
         } else {
            console.log(info.messageId);
         }
      }
   );
};

module.exports = {
   forgot_pass,
};
