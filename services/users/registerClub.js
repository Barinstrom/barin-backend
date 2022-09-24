const studentModel = require("../../models/student");
const schoolModel = require('../../models/school');
const clubModel = require("../../models/club");
const logsModel = require('../../models/registerLogs');
const mongoose = require('mongoose');

/*
    req.body = {
        clubID: ObjectId
    }
    
    identity ของ user,role,school จะใช้ใน token

    (ตอนขอชุมนุม) ปีการศึกษาจะถือว่าใช้ปีล่าสุดให้โดยอัตโนมัติ frontend ส่งปีไม่ล่าสุดมาจะพัง
    (เช็คทุกอย่างเทียบกับปีล่าสุดในโรงเรียน,นักเรียน,ชุมนุม)

    NOTE: พอทำอันนี้แล้วคิดขึ้นมาได้ว่า อย่าลืมแก้ verifySchool ให้ 400 กับ โรงเรียนที่ไม่จ่ายเงิน
         รวมถึงเช็คเวลาจ่ายเงินใน verifyschool ด้วยเลย

*/
const registerClub = async (req, res) => {

    //เช็คว่า schedule ของ school อยู่ใน registerDate มั้ย
    const _school = await schoolModel.findOne({schoolID: req.userInfo.schoolID}).exec();
    // มี _school แน่ๆ เพราะหาตอน verifySchool
    let now = new Date().getTime();
    // get newest schedule
    let schedule = _school.schedule.sort((a,b) => b.schoolYear - a.schoolYear);
    let schedule_now = schedule[0];
    const schoolYear = schedule_now.schoolYear;
    if(now>schedule_now.endOfRegisterDate.getTime() || now<schedule_now.registerDate.getTime()){
        return res.status(400).send({
            'success':false,
            'error':'not in register time'});
    }

    //เช็คว่า student ยังไม่ได้ลงทะเบียนในปีปัจจุบัน => 
    const _student = await studentModel.findOne({userID: new mongoose.mongo.ObjectId(req.userInfo._id) });
    let study_history = _student.clubs.sort((a,b) => b.schoolYear - a.schoolYear);
    let study_now = study_history[0];
    if(study_now.studyYear > schoolYear){
        return res.status(409).send({
            'success':false,
            'error':'schoolYear and newest studyYear of study is conflict'});
    }
    if(study_now.studyYear === schoolYear && study_now.clubID){
        return res.status(400).send({
            'success':false,
            'error':'you already registered'});
    }
    // OK to register
    // update student ใส่ตรงๆเลย ส่วนการถอนจะการลบตัวแรกออก (เหมือนลบออกแล้วใส่ใหม่)

    //เช็คว่าเกิน limit ของ club มั้ย
    const _club = await clubModel.findById(req.body.clubID);
    if(_club.schoolID !== req.userInfo.schoolID){
        return res.status(400).send({
            'success':false,
            'error':'this club is not in your school'});
    }
    // check log
    const all_action = logsModel.find({clubID: new mongoose.mongo.ObjectId(req.body.clubID)});
    let count = 0;
    for(let i=0;i<all_action.length;i++){
        if(all_action[i].action === 'register'){
            count++;
        }
        else{
            count--;
        }
    }
    if(count>_club.limit){
        return res.status(400).send({
            'success':false,
            'error':'this club full'})
    }

    //ลงทะเบียน club 
    await logsModel.create({
        studentID: req.userInfo._id,
        clubID: _club._id,
        action: 'register',
        date: new Date(),
    })

    const new_club_study_data = {
        clubID: _club._id,
        status: "Studying",
        studyYear: schoolYear,
    }
    const new_study_history = {new_club_study_data,...study_history};
    _student.clubs = new_study_history;
    await _student.save();

    res.send({'success':true});

};

module.exports = registerClub;

