const TeacherModel = require("../../models/teacher");
const mongoose = require("mongoose");

const getTeacherPastClubs = async (req, res) => {
    const teacher = await TeacherModel.findOne({
        userID: new mongoose.mongo.ObjectId(req.userInfo._id),
    });
    let clubsID = teacher.clubs;
    let pastclubs = [];
    for (let i = 0; i < clubsID.length; i++) {
        if(clubsID[i].status != "Studying")
            pastclubs.push(clubsID[i]);
    }
    res.json({ clubs: pastclubs });
};

module.exports = getTeacherPastClubs;