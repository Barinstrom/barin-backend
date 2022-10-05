const schoolModel = require("../../../models/school");
const { cloudinary } = require("../../utils/cloudinary");

const editSchoolAdmin = async (req, res) => {
   const values = ({
      schoolName,
      urlLogo
   } = req.body);
   //console.log('------------------')
   //console.log(req.userInfo.schoolID)
   const school = await SchoolModel.findOne({
      schoolID: req.userInfo.schoolID,
   });
   console.log(school)

   schoolModel
      .findOneAndUpdate({ schoolID: req.userInfo.schoolID }, {$set: values})
      .then(() => {
         res.json({
            message: "School updated successfully",
         });
      })
      .catch((err) => {
         res.json({
            message: "Error updating school",
         });
      });
};

module.exports = editSchoolAdmin;

/*
const updateSchool = async (req, res) => {
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

module.exports = updateSchool;*/
