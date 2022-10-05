const schoolModel = require("../../../models/school");

const editSchoolAdmin = (req, res) => {
   const values = ({
      schoolName,
      urlLogo
   } = req.body);
   console.log('------------------')
   console.log(req.userInfo.schoolID)

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
