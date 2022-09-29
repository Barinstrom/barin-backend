const StudentModel = require("../../models/student");
const clubModel = require("../../models/club");
const mongoose = require("mongoose");

const getStudentPastClubs = async (req, res) => {
    const student = await StudentModel.findOne({
        userID: new mongoose.mongo.ObjectId(req.userInfo._id),
    });
    let clubsID = student.clubs;
    let pastclubs = [];
    for (let i = 0; i < clubsID.length; i++) {
        if(clubsID[i].status != "Studying")
            pastclubs.push(await clubModel.findById(clubsID[i].clubID));
    }
    res.json({ clubs: pastclubs });
};

module.exports = getStudentPastClubs;