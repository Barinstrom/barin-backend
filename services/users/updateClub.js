const ClubModel = require("../../models/club");
const { cloudinary } = require("../../utils/cloudinary");

const updateClub = async (req, res) => {
   const payload = req.body;
   const clubID = payload.clubID
   console.log(req.params.schoolID)
   delete payload["clubID"]
   
   if (req.body.urlPicture) {
      const uploadPic = await cloudinary.uploader.upload(req.body.urlPicture, {
         upload_preset: "urlPicture",
         public_id: req.userInfo.email,
      });
      const urlPicture = uploadPic.secure_url;
      payload["urlPicture"] = urlPicture;  
   }
   
   console.log(payload);
   // console.log(clubID);
   const _club = await ClubModel.findById(clubID)
   if(!_club)
   {
      return res.status(400).send("Invalid clubID")
   }
   await ClubModel.findByIdAndUpdate(clubID, {$set: payload})
   .then(() => {
      res.send({success: true});
   })
   .catch((err) => {
      res.status(400).send(err);
   });
};

module.exports = updateClub;