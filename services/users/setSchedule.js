const SchoolModel = require("../../models/school");
// const moment = require('moment');

const updateSchedule = async (req, res) => {
    const schoolID = req.userInfo.schoolID;
    const school = await SchoolModel.findOne({schoolID:schoolID});
    const schoolYear = req.body.schoolYear;
    nowYear = school.paymentDate.getFullYear();
    // frontend เตือน user บอกว่าถ้าพังให้ติดต่อ host แก้ใน db
    if(schoolYear>nowYear+1 || schoolYear<nowYear-1){
        return res.status(400).send({'success':false,'message':'year is invalid'})
    }
    // console.log(school)
    // for(let i=0;i<school.schedule.length;i++)
    // {
    //     if(req.body.schoolYear == school.schedule[i].schoolYear)
    //         return res.send("Invalid schoolYear")
    // }
    
    const addSchedule = {
        "schoolYear": req.body.schoolYear,
        "registerDate": new Date(req.body.registerDate),
        "endOfRegisterDate": new Date(req.body.endOfRegisterDate),
        "endOfSchoolYear":  new Date(req.body.endOfSchoolYear)
    }
    // console.log(addSchedule)
    console.log('asdd' ,school)
    let schedule = school.schedule.sort((a,b) => b.schoolYear - a.schoolYear);
    //onsole.log('asdd' ,school)
    let nowSchedule = schedule[0];
    console.log(schedule);
    if(nowSchedule ){
        if(schoolYear < nowSchedule.schoolYear)
            return res.status(400).send({'success':false,'message':'cant change pass schedule'})
    }
    // const totalSchedule = [addSchedule, ...school.schedule];
    let newSchedule = [];
    let isold = false;
    for(let i=0;i<schedule.length;i++){
        if(i==6){
            break;
        }
        if(schedule[i].schoolYear === schoolYear){
            isold = true;
            newSchedule = [addSchedule,...newSchedule];
        }
        //newSchedule.push(schedule[i]);
        else{
            newSchedule = [schedule[i],...newSchedule];
        }
    }
    if(!isold){
        newSchedule = [addSchedule,...newSchedule];
    }
    // console.log(totalSchedule)
    await SchoolModel.findOneAndUpdate({schoolID: schoolID}, { $set: {schedule : newSchedule, nowSchoolYear: schoolYear}})
        .then(() => {
            res.send({ 'success': true });
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

module.exports = updateSchedule;