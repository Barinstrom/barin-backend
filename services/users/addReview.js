const clublModel = require("../../models/club");
const reviewModel = require("../../models/review");
const studentModel = require("../../models/student");

const addReview = async (req, res) => {
   //หา groupID ของ club
   const clubID = req.body.clubID;
   const club = await clublModel.findById(clubID);
   const groupID = club.groupID;

   const studentID = req.body.studentID;

   // add new review in reviews
   const payloadReview = { textReview: req.body.textReview, groupID: groupID, studentID: studentID };
   const review = new reviewModel(payloadReview);
   const newReview = await review.save()
      .then(() => {
         res.send({ success: true });
      })
      .catch((err) => {
         res.status(400).send(err);
      });
};

module.exports = addReview;
