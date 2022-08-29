const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: "barinschool@hotmail.com",
        pass: "Theredfox",
    },
});

const sender = (tomail, toname) =>{
    transporter.sendMail({
        from: 'Barin Admin <barinschool@hotmail.com>',   // ผู้ส่ง
        to: `${toname} <${tomail}>`,// ผู้รับ
        subject: "สวัสดีจ้า",                      // หัวข้อ
        text: "สวัสดีนะ",                         // ข้อความ
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