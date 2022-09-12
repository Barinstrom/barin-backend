const clublModel = require("../../models/club");
const reviewModel = require("../../models/review");
const studentModel = require("../../models/student");

const addReview = async (req, res) => {
   //check school
   const schoolID = req.params.schoolID;
   if (req.userInfo.role !== "host" && req.userInfo.schoolID !== schoolID) {
      return res.status(401).send({ error: "This school is not your school" });
   }  
   // add review in reviews
   const textReview = { textReview: req.body.textReview };
   const review = new reviewModel(textReview);
   const newReview = await review.save();
   const reviewID = newReview._id;

   //หา student เพื่อไป add reviewID in student
   const studentID = req.body.studentID;
   const student = await studentModel.findOne({ userID: studentID });

   // add reviewID in student
   const payloadStudent = [...student.reviews, reviewID];
   await studentModel.updateOne(
      { userID: studentID },
      { $set: { reviews: payloadStudent } }
   );

   //หา club เพื่อไป add reviewID in club
   const clubID = req.body.clubID;
   const club = await clublModel.findById(clubID);

   // add reviewID in club
   const payloadClub = [...club.reviews, reviewID];
   await clublModel
      .findByIdAndUpdate(clubID, { $set: { reviews: payloadClub } })
      .then(() => {
         res.send({ success: true });
      })
      .catch((err) => {
         res.status(400).send(err);
      });
};

module.exports = addReview;
