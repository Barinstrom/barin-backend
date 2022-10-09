const clubModel = require("../../models/club");
const reviewModel = require("../../models/review");

const getReviews = async (req, res) => {
    //หา club ที่จะดูรีวิว
    const tmpClub = await clubModel.findById(req.query.clubID);
    const club = await clubModel.findOne({ groupID: tmpClub.groupID, schoolYear: req.query.schoolYear });
    if (!club)
        return res.status(400).send({ error: "This club doesn't exist." });

    //query สำหรับ paginate
    const query = { groupID: tmpClub.groupID, schoolYear: req.query.schoolYear, studentID:{$ne: new mongoose.mongo.ObjectId(req.userInfo._id)}};
    const page = req.query.page || 1;
    const limit = 3;

    //paginate
    reviewModel
        .paginate(query, { page, limit })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
   
};

module.exports = getReviews;
