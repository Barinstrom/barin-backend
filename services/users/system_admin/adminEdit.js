const userModel = require("../../../models/user");

const schoolEdit = (req, res) => {
   const values = ({
      _id,
      email,
      password,
      tel
   } = req.body);
   userModel
      .findOneAndUpdate({ _id: values._id }, { $set: { 
        email: values.email } })
      .then(() => {
         res.json({
            message: "admin updated successfully",
         });
      })
      .catch((err) => {
         res.json({
            message: "Error updating admin",
         });
      });
};

module.exports = schoolEdit;
