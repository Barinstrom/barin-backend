const teacherModel = require("../../models/teacher");
const clubModel = require("../../models/club");
const getTeachers = require("../../utils/getClubTeacher");
const mongoose = require("mongoose");

// เรา paginate เอง
const getTeacherOwnClubs = async (req, res) => {
   const queryclubs = await teacherModel.findOne({
      userID: new mongoose.mongo.ObjectId(req.userInfo._id),
   });
   console.log(queryclubs.clubs);
   let clubsID = queryclubs.clubs;
   let clubs = [];
   for (let i = 0; i < clubsID.length; i++) {
      const doc = await clubModel.findById(clubsID[i].clubID).lean();
      const teachers = await getTeachers(clubsID[i].clubID,req);
      clubs.push({...doc,teachers});
   }
   res.json({ clubs: clubs });
};

module.exports = getTeacherOwnClubs;
