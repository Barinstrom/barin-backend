const schoolModel = require('../models/school');

const verifySchool = async (req,res,next) => {
    if(!req || !req.userInfo || !req.userInfo.school) return res.sendStatus(401);

    try{
        const school = await schoolModel.findOne({schoolID: req.params.school}).exec();
    }catch(err){
        console.log(err);
    }

    if(!school){
        // พิมพ์ route มั่ว
        return res.status(400).send({'message':'this route is invalid'});
    }
    if(school.schoolID !== req.userInfo.school){
        // ถ้า school ใน token เป็น all => host ให้ผ่านไปได้เลย
        if(req.userInfo.school === 'all'){
            next();
        }
        // พยายามเข้า route ของโรงเรียนอื่น
        return res.status(401).end()
    }
    // หลุดมาถึงตรงนี้ => ok มีสิทธ์เข้าถึง
    next();
}

module.exports = verifySchool;