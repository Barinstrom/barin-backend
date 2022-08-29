const nodemailer = require("nodemailer");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: "barinschool@hotmail.com",
        pass: "Theredfox",
    },
});

const sender = (tomail, toname, confirmationCode) =>{
    transporter.sendMail({
        from: 'Barin Admin <barinschool@hotmail.com>',   // ผู้ส่ง
        to: `${toname} <${tomail}>`,// ผู้รับ
        subject: "สวัสดีจ้า",                      // หัวข้อ
        text: "สวัสดีนะ",                         // ข้อความ
        // html: `<h1>Email Confirmation</h1>
        // <h2>Hello ${toname}</h2>
        // <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        // <a href=http://localhost:54321/confirm/${confirmationCode}> Click here</a>
        // </div>`,
    }, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info.messageId);
        }
    });
}

module.exports = {
    sender
};