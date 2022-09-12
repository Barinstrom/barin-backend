// const userModel = require("../../../models/user");
// const adminModel = require("../../../models/admin");

// const editAdmin = (req, res) => {
//    const values = ({ _id, email, password, tel } = req.body);
//    const hashPassword = bcrypt.hashSync(values.password, 10);
   
//    userModel
//       .findOneAndUpdate({ _id: values._id }, { $set: { 
//       email: values.email,
//       password: hashPassword} })
//       .then(() => {
//          res.json({
//             message: "School updated successfully",
//          });
//       })
//       .catch((err) => {
//          res.json({
//             message: "Error updating school",
//          });
//       });
// };

// module.exports = editAdmin;
