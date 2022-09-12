const userModel = require("../../../models/user");
const adminModel = require("../../../models/admin");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const editAdmin = (req, res) => {
   const values = ({ _id, email, password, tel } = req.body);
   const hashPassword = bcrypt.hashSync(values.password, 10);
   const result = []
   

   if (req.userInfo.role !== "host") {
    return res.status(401).send({ error: "You doesn't have access to do that" });
    }  

   const obj_id = new mongoose.mongo.ObjectId(values._id);
   userModel
      .findOneAndUpdate({ _id: obj_id }, { $set: { 
      email: values.email,
      password: hashPassword} })
      .then(() => {
         result.push("admin updated email or password successfully")
      })
      .catch((err) => {
         res.json({
            message: "Error updating school"
         });
      });
    
    adminModel
      .findOneAndUpdate({ userID: obj_id }, { $set: { 
      tel: values.tel} })
      .then((result) => {
         result.push("update telephone success")
         res.json({
            message: "update telephone success"
         });
      })
      .catch((err) => {
         res.json({
            message: "Error updating telephone"
         });
      });
};

module.exports = editAdmin;

//{"email":"a@a.com"}