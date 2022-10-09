const reviewModel = require("../../models/review");

const updateReview = async (req, res) => {
   const reviewID = req.body.reviewID;
   const review = await reviewModel.findById(reviewID)
   if(!review)
   {
      return res.status(400).send("Invalid reviewID")
   }
   // update review
   await reviewModel.findByIdAndUpdate(reviewID , { $set: { textReview : req.body.textReview , satisfiedLevel: req.body.satisfiedLevel,
                                                   updateReview: true, edited: true, lastUpdateDate: new Date().getTime()} })
      .then(() => {
         res.send({ success: true });
      })
      .catch((err) => {
         res.status(400).send(err);
      });
};

module.exports = updateReview;
