const schoolModel = require('../models/school');

const verifySchool = async (req,res,next) => {
    if(!req || !req.userInfo || !req.userInfo.schoolID) return res.sendStatus(400);

    /*try{
        const school = await schoolModel.findOne({schoolID: req.params.school}).exec();
    }catch(err){
        console.log(err);
    }*/
    console.log('params',req.params);
    // req.params = /:schoolID
    const school = await schoolModel.findOne({schoolID: req.params.schoolID}).exec();
    if(!school){
        // พิมพ์ route มั่ว
        return res.status(400).send({'message':'this route is invalid'});
    }
    console.log(school);
    if(school.schoolID !== req.userInfo.schoolID){
        console.log(req.userInfo)
        // ถ้า school ใน token เป็น all => host ให้ผ่านไปได้เลย
        console.log('asdfghjk   ',req.userInfo.schoolID)
        if(req.userInfo.schoolID === 'all'){
            req.userInfo.schoolID = req.params.schoolID;
            // req.userInfo.schoolID = :schoolID
            if(school.paymentStatus !== "success"){
                return res.status(400).send({'message':'not pay yet'});
            }
            if(school.status !== "approve"){
                return res.status(400).send({'message':'school is not active'});
            }
            let now = new Date()
            console.log((school.paymentDate.getTime()+365*24*60*60*1000),' ',(now.getTime()),' ',((school.paymentDate.getTime()+365*24*60*60*1000)-(now.getTime())))
            if(((school.paymentDate.getTime()+365*24*60*60*1000)-(now.getTime()))<=0){
                school.paymentStatus = "pending";
                school.status = "pending"
                await school.save();
                return res.status(400).send('need to pay');
            }
            return next();
        }
        // พยายามเข้า route ของโรงเรียนอื่น
        return res.status(401).send('this is not yours school :(');
    }
    // หลุดมาถึงตรงนี้ => ok มีสิทธ์เข้าถึง
    if(school.paymentStatus !== "success"){
        return res.status(400).send({'message':'not pay yet'});
    }
    if(school.status !== "approve")
        return res.status(400).send({'message':'school is not active'});
    let now = new Date()
    console.log((school.paymentDate.getTime()+365*24*60*60*1000),' ',(now.getTime()),' ',((school.paymentDate.getTime()+365*24*60*60*1000)-(now.getTime())))
    if(((school.paymentDate.getTime()+365*24*60*60*1000)-(now.getTime()))<=0){
        school.paymentStatus = "pending";
        school.status = "pending"
        await school.save();
        return res.status(400).send('need to pay');
    }
    next();
}

module.exports = verifySchool;