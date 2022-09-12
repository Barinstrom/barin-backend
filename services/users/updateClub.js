const ClubModel = require("../../models/club");

const updateClub = async (req, res) => {
   const payload = req.body;
   const clubID = payload.clubID
   delete payload["clubID"]
   // console.log(payload);
   // console.log(clubID);
   await ClubModel.findByIdAndUpdate(clubID, {$set: payload})
   .then(() => {
      res.send("Edit club success.");
   })
   .catch((err) => {
      res.status(400).send(err);
   });
};

module.exports = updateClub;