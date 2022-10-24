const clubModel = require("../../models/club");
const teacherModel = require("../../models/teacher");
const userModel = require("../../models/user");
const { cloudinary } = require("../../utils/cloudinary");

const addClub = async (req, res) => {
   //check club name
   if (
      await clubModel.findOne({
         clubName: req.body.clubName,
         schoolID: req.userInfo.schoolID,
      })
   )
      return res.status(400).send({ error: "Club name is already exists." });

   //เช็คว่าเป็น teacher ของโรงเรียนนี้หรือไม่
   const _user = await userModel.findOne({ email: req.body.teacherEmail });
   if(_user.role != "teacher")
      return res
         .status(400)
         .send({ error: "This user isn't teacher." });
   if (_user.schoolID != req.userInfo.schoolID)
      return res
         .status(400)
         .send({ error: "This teacher isn't at your school." });

   
   //หา teacher เพื่อไป add clubID in teacher
   teacher = await teacherModel.findOne({ userID: _user._id });
   if (!teacher)
      return res.status(400).send({ error: "This teacher doesn't exist." });


   //เตรียม payloadClub
   const payloadClub = req.body;
   payloadClub["schoolID"] = req.userInfo.schoolID;
   if (req.body.urlPicture) {
      const uploadPic = await cloudinary.uploader.upload(req.body.urlPicture, {
         upload_preset: "urlPicture",
         public_id: req.body.clubName + "_" + req.userInfo.schoolID,
      });
      const urlPicture = uploadPic.secure_url;
      payloadClub["urlPicture"] = urlPicture;
   }

   //add new club
   const club = new clubModel(payloadClub);
   const newClub = await club.save();
   const clubID = newClub._id;

   // add clubID in teacher
   const payloadTeacher = [...teacher.clubs, clubID];
   await teacherModel
      .updateOne(
         { userID: _user._id },
         { $set: { clubs: payloadTeacher } }
      )
      .then(() => {
         res.send({ success: true });
      })
      .catch((err) => {
         res.status(400).send(err);
      });
};

module.exports = addClub;
