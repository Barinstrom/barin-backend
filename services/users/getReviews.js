const clubModel = require("../../models/club");
const reviewModel = require("../../models/review");

const getReviews = async (req, res) => {
    //หา groupID ของ club
    const clubID = req.query.clubID;
    const club = await clubModel.findById(clubID);
    const groupID = club.groupID;

    //query สำหรับ paginate
    const query = { groupID: groupID };
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
