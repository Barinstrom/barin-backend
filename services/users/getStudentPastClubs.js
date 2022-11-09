const StudentModel = require("../../models/student");
const clubModel = require("../../models/club");
const getTeachers = require("../../utils/getClubTeacher");
const mongoose = require("mongoose");

const getStudentPastClubs = async (req, res) => {
    const student = await StudentModel.findOne({
        userID: new mongoose.mongo.ObjectId(req.userInfo._id),
    });
    let clubsID = student.clubs;
    let pastclubs = [];
    for (let i = 0; i < clubsID.length; i++) {
        if(clubsID[i].studyYear != req.query.schoolYear){
            const doc = await clubModel.findById(clubsID[i].clubID).lean();
            doc["status"] = clubsID[i].status
            const teachers = await getTeachers(clubsID[i].clubID,req);
            pastclubs.push({...doc,teachers});
        }
    }
    res.json({ clubs: pastclubs });
};

module.exports = getStudentPastClubs;