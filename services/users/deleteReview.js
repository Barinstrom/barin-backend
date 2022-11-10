const ReviewModel = require("../../models/review");

const deleteReview = async (req, res) =>{
    const reviewID = req.body.reviewID
    let _review = await ReviewModel.findById(reviewID)
    if(!_review){
        return res.status(400).send({ error: "This review doesn't exist." });
    }
    await ReviewModel.findByIdAndDelete(reviewID)
    res.json({'success': true})
}

module.exports = deleteReview;