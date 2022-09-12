const clubModel = require("../../models/club");
const teacherModel = require("../../models/teacher");

const addClub = async (req, res) => {
   //check school
   const schoolID = req.params.schoolID;
   if (req.userInfo.role !== "host" && req.userInfo.schoolID !== schoolID) {
      return res.status(401).send({ error: "This school is not your school" });
   }  

   //check club name
   if (await clubModel.findOne({ clubName: req.body.clubName }))
      return res.status(400).send({ error: "Club name is already exists." });

   const payloadClub = req.body;
   const teacherID = req.body.teacherID;
   delete payloadClub["teacherID"];

   //add new club
   const club = new clubModel(payloadClub);
   const newClub = await club.save();
   const clubID = newClub._id;

   //หา teacher เพื่อไป add clubID in teacher
   const teacher = await teacherModel.findOne({ userID: teacherID });

   // add clubID in teacher
   const payloadTeacher = [...teacher.clubs, clubID];
   await teacherModel.updateOne(
      { userID: teacherID },
      { $set: { clubs: payloadTeacher } }
   ).then(() => {
      res.send({ success: true });
   })
   .catch((err) => {
      res.status(400).send(err);
   });
      
};

module.exports = addClub;
