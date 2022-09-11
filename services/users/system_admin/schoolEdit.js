const adminModel = require("../../../models/admin");

const schoolEdit = (req, res) => {
   const values = ({
      schoolID,
      schoolName,
      urlCertificateDocument,
      paymentStatus,
      status,
   } = req.body);
   schoolModel
      .findOneAndUpdate({ schoolID: values.schoolID }, { $set: { values } })
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
