const reviewModel = require("../../models/review");

const updateReview = async (req, res) => {
   const reviewID = req.body.reviewID;
   // update review
   await reviewModel.findByIdAndUpdate(reviewID , { $set: { textReview : req.body.textReview } })
      .then(() => {
         res.send("Edit review success.");
      })
      .catch((err) => {
         res.status(400).send(err);
      });
};

module.exports = updateReview;
