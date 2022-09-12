const reviewModel = require("../../models/review");

const updateReview = async (req, res) => {
   //check school
   const schoolID = req.params.schoolID;
   if (req.userInfo.role !== "host" && req.userInfo.schoolID !== schoolID) {
      return res.status(401).send({ error: "This school is not your school" });
   }  
   const reviewID = req.body.reviewID;
   // update review
   await reviewModel.findByIdAndUpdate(reviewID , { $set: { textReview : req.body.textReview } })
      .then(() => {
         res.send({ success: true });
      })
      .catch((err) => {
         res.status(400).send(err);
      });
};

module.exports = updateReview;
