const clublModel = require("../../models/club");
const studentModel = require("../../models/student");

const registerClub = async (req, res) => {
    //เช็คว่า schedule ของ school อยู่ใน registerDate มั้ย
    
    //เช็คว่า student ยังไม่ได้ลงทะเบียนในปีปัจจุบัน

    //เช็คว่าเกิน limit ของ club มั้ย

    //ลงทะเบียน club 

   
};

module.exports = registerClub;
