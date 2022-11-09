const clubModel = require("../../models/club");
const teacherModel = require("../../models/teacher");
const userModel = require("../../models/user");
const { cloudinary } = require("../../utils/cloudinary");

const addClubs = async (req, res) => {
   const clubs = req.body;
   for (const club of clubs) {
      //check club name
      if (
         await clubModel.findOne({
            clubName: club.clubName,
            schoolID: req.userInfo.schoolID,
            schoolYear: club.schoolYear,
         })
      )
         return res.status(400).send({ error: "Club name is already exists in this year." });
      
      //check groupID
      if (
         await clubModel.findOne({
            groupID: club.groupID,
            schoolYear: club.schoolYear,
         })
      )
         return res.status(400).send({ error: "GroupID is already exists in this year." });

      //เช็คว่าเป็น teacher ของโรงเรียนนี้หรือไม่
      const _user = await userModel.findOne({ email: club.teacherEmail });
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
      const payloadClub = club;
      payloadClub["schoolID"] = req.userInfo.schoolID;
      payloadClub["schedule"] = ["วันจันทร์ 13:00-13:50"]
      payloadClub["urlPicture"] = "https://files.tawanchai.com/pic/rordor.png"
      if (club.urlPicture) {
         const uploadPic = await cloudinary.uploader.upload(
            club.urlPicture,
            {
               upload_preset: "urlPicture",
               public_id: club.clubName + "_" + req.userInfo.schoolID,
            }
         );
         const urlPicture = uploadPic.secure_url;
         payloadClub["urlPicture"] = urlPicture;
      }
   

      //add new club
      const newClub = await clubModel.create(payloadClub);
      const clubID = newClub._id;

      // add clubID in teacher
      const payloadTeacher = [...teacher.clubs, clubID];
      await teacherModel
         .updateOne(
            { userID: _user._id },
            { $set: { clubs: payloadTeacher } }
         )
         .catch((err) => {
            return res.status(400).send(err);
         });
   }
   res.send({ success: true });
};

module.exports = addClubs;
