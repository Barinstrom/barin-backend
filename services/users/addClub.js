const clubModel = require("../../models/club");

const addClub = async (req, res) => {
   const payload = req.body;
   const club = new clubModel(payload);

   await club.save()
      .then(() => {
         res.send("Add club success.");
      })
      .catch((err) => {
         if(clubModel.findOne({clubName : req.body.clubName}))
            return res.status(400).send("Club name is already exists.");
         res.status(400).send(err);
      });
};

module.exports = addClub;
