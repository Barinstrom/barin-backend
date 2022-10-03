const SchoolModel = require("../../models/school");
const { cloudinary } = require("../../utils/cloudinary");

const updateSchool = async (req, res) => {
   const { schoolName, logo } = req.body;
   const school = await SchoolModel.findOne({
      schoolID: req.userInfo.schoolID,
   });

   if (schoolName) {
      school.schoolName = schoolName;
   }
   if (logo) {
      const uploadLogo = await cloudinary.uploader.upload(logo, {
         upload_preset: "urlLogo",
         public_id: req.userInfo.email,
      });
      const urlLogo = uploadLogo.secure_url;
      school.urlLogo = urlLogo;
   }
   await school.save();
   res.json({ success: "true" });
};

module.exports = updateSchool;
