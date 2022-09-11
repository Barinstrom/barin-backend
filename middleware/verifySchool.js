const schoolModel = require("../models/school");

const verifySchool = async (req, res, next) => {
   if (!req || !req.userInfo || !req.userInfo.schoolID)
      return res.sendStatus(400);

   /*try{
        const school = await schoolModel.findOne({schoolID: req.params.school}).exec();
    }catch(err){
        console.log(err);
    }*/
   console.log("params", req.params);
   const school = await schoolModel
      .findOne({ schoolID: req.params.school })
      .lean()
      .exec();
   if (!school) {
      // พิมพ์ route มั่ว
      return res.status(400).send({ message: "this route is invalid" });
   }
   console.log(school);
   if (school.schoolID !== req.userInfo.schoolID) {
      console.log(req.userInfo);
      // ถ้า school ใน token เป็น all => host ให้ผ่านไปได้เลย
      if (req.userInfo.schoolID === "all") {
         next();
      }
      // พยายามเข้า route ของโรงเรียนอื่น
      return res.status(401).send("this is not yours school :(");
   }
   // หลุดมาถึงตรงนี้ => ok มีสิทธ์เข้าถึง
   next();
};

module.exports = verifySchool;
