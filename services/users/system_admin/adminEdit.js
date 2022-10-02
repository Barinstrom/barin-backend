const userModel = require("../../../models/user");
const adminModel = require("../../../models/admin");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const editAdmin = async (req, res) => {
   const values = ({ _id, email, password, tel } = req.body);
   const hashPassword = bcrypt.hashSync(values.password, 10);
   const obj_id = new mongoose.mongo.ObjectId(values._id);
   let update_email_password = 0
   let update_tel = 0

   if (req.userInfo.role !== "host") {
      return res.status(401).send({success:false,message: "You doesn't have access to do that" });
   }  

   await userModel.findOneAndUpdate({ _id: obj_id }, { $set: { 
      email: values.email,
      password: hashPassword} })
      .then(() => {
         update_email_password = 1
      })
      .catch((err) => {
         console.log("test")
         update_email_password = 0
      });
    
   await adminModel.findOneAndUpdate({ userID: obj_id }, { $set: { 
      tel: values.tel} })
      .then((result) => {
         update_tel = 1
      })
      .catch((err) => {
         update_tel = 0
      });

   console.log(update_email_password)
      if (!update_email_password)
         return res.json({success:false,message: "update email or password fail"});
      if (!update_tel)
         return res.json({success:false,message: "update telephone fail"});

      return res.json({success:true,message: "update success"});
};



module.exports = editAdmin;

//{"email":"a@a.com"}