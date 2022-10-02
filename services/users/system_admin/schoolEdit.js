const schoolModel = require("../../../models/school");

const schoolEdit = (req, res) => {
   const values = ({
      schoolName,
      urlLogo,
      bgColor
   } = req.body);

   if (req.userInfo.role !== "admin" && req.userInfo.role !== "host") {
      return res.status(401).send({ error: "You doesn't have access to do that" });
   }  
   
   if (req.userInfo.role === "admin" && req.userInfo.schoolID !== schoolID) {
      return res.status(401).send({ error: "This school is not your school" });
   }
   
   schoolModel
      .findOneAndUpdate({ schoolID: values.schoolID }, {$set: values})
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

module.exports = schoolEdit;
