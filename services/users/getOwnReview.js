const clubModel = require("../../models/club");
const reviewModel = require("../../models/review");
const studentModel = require("../../models/student");
const mongoose = require('mongoose');

const getOwnReview = async (req, res) => {
    //หา student
    const studentID = mongoose.mongo.ObjectId(req.userInfo._id)
    const student = await studentModel.findOne({userID: studentID});
    if (!student)
        return res.status(400).send({ error: "This student doesn't exist." });

    //หา review
    const review = await reviewModel.findOne({studentID: studentID, schoolYear: club.schoolYear});
    if(review)
        res.send(review);
    else
        res.status(400).send({ error: "Can't find a review." });
};

module.exports = getOwnReview;
