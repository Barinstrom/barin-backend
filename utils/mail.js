const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
   host: "smtp.office365.com",
   auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
   },
});

const sender = (tomail, toname, confirmationCode) => {
   transporter.sendMail(
      {
         from: "Barin Admin <barinschool@hotmail.com>",
         to: `${toname} <${tomail}>`,
         subject: "Activation Code",
         html: `<h1>Email Confirmation</h1>
        <h2>Hello ${toname}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=${process.env.WEB_URL}/confirm/${confirmationCode}> Click here</a>
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
   sender,
};
