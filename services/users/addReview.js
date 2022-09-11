const clublModel = require("../../models/club");
const reviewModel = require("../../models/review");
const studentModel = require("../../models/student");

const addReview = async (req, res) => {
   // add review in reviews
   const textReview = { textReview: req.body.textReview };
   const review = new reviewModel(textReview);
   const newReview = await review.save();
   const reviewID = newReview._id;

   //หา student เพื่อไป add reviewID in student
   const studentID = req.body.studentID;
   const student = await studentModel.findById(stdID);

   // add reviewID in student
   if (student.reviews) {
      //ถ้านักเรียนมีรีวิวอยู่แล้ว
      const payloadStudent = [...student.reviews, reviewID];
      await studentModel
         .findByIdAndUpdate(studentID, { $set: { reviews: payloadStudent } })
         .then(() => {
            res.send("Add review in student success.");
         })
         .catch((err) => {
            res.status(400).send(err);
         });
   } else {
      //ถ้านักเรียนยังไม่ได้รีวิว
      const payloadStudent = [reviewID];
      await studentModel
         .findByIdAndUpdate(studentID, { $set: { reviews: payloadStudent } })
         .then(() => {
            res.send("Add review in student success.");
         })
         .catch((err) => {
            res.status(400).send(err);
         });
   }

   //หา club เพื่อไป add reviewID in club
   const clubID = req.body.clubID;
   const club = await clublModel.findById(clubID);

   // add reviewID in club
   if (club.reviews) {
      //ถ้าชุมนุมมีรีวิวอยู่แล้ว
      const payloadClub = [...club.reviews, reviewID];
      await clublModel
         .findByIdAndUpdate(clubID, { $set: { reviews: payloadClub } })
         .then(() => {
            res.send("Add review in club success.");
         })
         .catch((err) => {
            res.status(400).send(err);
         });
   } else {
      //ถ้าชุมนุมยังไม่มีรีวิว
      const payloadClub = [reviewID];
      await clublModel
         .findByIdAndUpdate(clubID, { $set: { reviews: payloadClub } })
         .then(() => {
            res.send("Add review in club success.");
         })
         .catch((err) => {
            res.status(400).send(err);
         });
   }
};

module.exports = addReview;
