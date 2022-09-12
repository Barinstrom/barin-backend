const User = require("../models/user");
const jwt = require("jsonwebtoken");
const verifyUser = async (req, res, next) => {
   jwt.verify(
      req.params.confirmationCode,
      process.env.SECRET,
      async (err, decode) => {
         if (err) return res.status(401).send("token is invalid");
         let user = await User.findOneAndUpdate(
            {
               confirmationCode: req.params.confirmationCode,
            },
            {
               status: "Active",
            }
         );
         if (user) {
            return res.status(200).send({ message: "Activate finish" });
         } else {
            return res.status(404).send({ message: "User Not found." });
         }
      }
   );
};

module.exports = verifyUser;
