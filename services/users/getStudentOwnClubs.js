const StudentModel = require("../../models/student");
const clubModel = require("../../models/club");
const mongoose = require("mongoose");

const getStudentOwnClubs = async (req, res) => {
   const student = await StudentModel.findOne({
      userID: new mongoose.mongo.ObjectId(req.userInfo._id),
   });
   console.log(student.clubs);
   let clubsID = student.clubs;
   let clubs = [];
   for (let i = 0; i < clubsID.length; i++) {
      clubs.push(await clubModel.findById(clubsID[i]));
   }
   res.json({ clubs: clubs });
};

module.exports = getStudentOwnClubs;
