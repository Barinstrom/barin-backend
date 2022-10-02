const clublModel = require("../../models/club");
const reviewModel = require("../../models/review");
const studentModel = require("../../models/student");
const mongoose = require('mongoose');

const addReview = async (req, res) => {
   //หา groupID ของ club
   const club = await clublModel.findOne({_id: req.body.clubID});
   if (!club)
      return res.status(400).send({ error: "This club doesn't exist." });

   //หา student
   const student = await studentModel.findOne({userID: mongoose.mongo.ObjectId(req.userInfo._id) });
   let isPass = false
   for(let i=0;i<student.clubs.length;i++){
      if(student.clubs[i].clubID.toString() == club._id.toString() & student.clubs[i].status == "Pass")
         isPass = true
   }
   if(!isPass)
      return res.status(400).send({ error: "This student hasn't passed this club." });

   // add new review in reviews
   const payloadReview = { textReview: req.body.textReview, groupID: club.groupID, schoolYear: club.schoolYear, studentID: student.userID};
   const review = new reviewModel(payloadReview);
   await review.save()
      .then(() => {
         res.send({ success: true });
      })
      .catch((err) => {
         res.status(400).send(err);
      });
};

module.exports = addReview;
