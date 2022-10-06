const userModel = require("../../../models/user");
const adminModel = require("../../../models/admin");
const jwt = require("jsonwebtoken");
const { sender } = require("../../../utils/mail");

const editAdmin = async (req, res) => {
   const values = ({ email, tel } = req.body);

   console.log(req.userInfo.schoolID);
   if (req.userInfo.role == "host" && values.email) {
      userModel
         .findOneAndUpdate(
            { schoolID: req.userInfo.schoolID },
            {
               $set: {
                  email: values.email,
               },
            }
         )
         .then(() => {
            const token = jwt.sign({ email: email }, process.env.SECRET, {
               expiresIn: "7d",
            });
            sender(values.email, values.email, token);
         })
         .catch((err) => {
            console.log(err);
            return res.json({
               success: false,
               message: "update email or password fail",
            });
         });
   } else if (values.email) {
      return res.json({
         success: false,
         message: "You can't change your email",
      });
   }

   const user = await userModel
      .findOne({ schoolID: req.userInfo.schoolID })
      .exec();

   adminModel
      .findOneAndUpdate(
         { userID: user._id },
         {
            $set: {
               tel: values.tel,
            },
         }
      )
      .then((result) => {})
      .catch((err) => {
         return res.json({ success: false, message: "update telephone fail" });
      });

   return res.json({ success: true, message: "update success" });
};

module.exports = editAdmin;

//{"email":"a@a.com"}
