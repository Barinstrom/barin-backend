const schoolModel = require("../../../models/school");

const schoolEdit = (req, res) => {
   const values = ({
      schoolID,
      schoolName,
      urlCertificateDocument,
      paymentStatus,
      status
   } = req.body);
   console.log(req.body)
   schoolModel
      .findOneAndUpdate({ schoolID: values.schoolID }, values)
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
