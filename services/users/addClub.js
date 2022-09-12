const clubModel = require("../../models/club");

const addClub = async (req, res) => {
   const payload = req.body;
   const teacherID = req.body.teacherID;
   delete payload["teacherID"];

   const club = new clubModel(payload);
   const newClub = await club.save();
   const clubID = newClub._id;

   //หา student เพื่อไป add reviewID in student
   const studentID = req.body.studentID;
   const student = await teacherModel.findOne({ userID: teacherID });

   // add clubID in teacher
   const payloadTeacher = [...teacher.club, clubID];
   await studentModel.updateOne(
      { userID: studentID },
      { $set: { reviews: payloadStudent } }
   );

   

   // const club = new clubModel(payload);
   // await club
   //    .save()
   //    .then(() => {
   //       res.send({ success: true });
   //    })
   //    .catch((err) => {
   //       if (clubModel.findOne({ clubName: req.body.clubName }))
   //          return res
   //             .status(400)
   //             .send({ error: "Club name is already exists." });
   //       res.status(400).send(err);
   //    });
};

module.exports = addClub;
