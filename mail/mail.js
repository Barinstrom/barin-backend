const nodemailer = require("nodemailer");
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: "barinschool@hotmail.com",
        pass: "Theredfox",
    },
});

// transporter.sendMail({
//     from: 'Barin Admin <barinschool@hotmail.com>',   // ผู้ส่ง
//     to: "Dio Brando <paradorn248@gmail.com>",// ผู้รับ
//     subject: "สวัสดีจ้า",                      // หัวข้อ
//     text: "สวัสดีนะ",                         // ข้อความ
// }, (err, info) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(info.messageId);
//     }
// });

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

// sender("paradorn248@gmail.com", "Erk")

module.exports = {
    sender
};