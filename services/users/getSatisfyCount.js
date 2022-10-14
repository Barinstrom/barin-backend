const clubModel = require("../../models/club");
const reviewModel = require("../../models/review");
const mongoose = require("mongoose");

const getSatisfyCount = async (req, res) => {
   //หา club ที่จะดูรีวิว
   if (!req.query.clubID) {
      return res.status(400).json({ message: "You didn't send clubID" });
   }
   const tmpClub = await clubModel.findById(req.query.clubID);
   if (!tmpClub)
      return res.status(400).send({ error: "This club doesn't exist." });
   const club = await clubModel.findOne({
      groupID: tmpClub.groupID,
      schoolYear: req.query.schoolYear,
   });

   let result = await reviewModel //.find({groupID: club.groupID,schoolYear: req.query.schoolYear,satisfiedLevel:"พอใจ"});
      .aggregate([
         {
            $match: {
               $and: [
                  { groupID: club.groupID },
                  { schoolYear: club.schoolYear },
               ],
            },
         },
         {
            $group: {
               _id: "$satisfiedLevel",
               count: { $sum: 1 },
            },
         },
      ]);
   let total = 0;
   for (const x of result) {
      total = total + x.count;
   }
   result[0].percent = (100 * result[0].count) / total;
   result[1].percent = (100 * result[1].count) / total;
   res.send(result);
};

module.exports = getSatisfyCount;
