const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const activate_admin = async (req, res, next) => {
   jwt.verify(req.body.token, process.env.SECRET, async (err, decode) => {
      if (err) return res.status(401).send({ status: false });
      let user = await User.findOneAndUpdate(
         {
            confirmationCode: req.body.token,
         },
         {
            status: "Active",
         }
      );
      if (user) {
         return res.status(200).send({ status: true });
      } else {
         return res.status(404).send({ status: false });
      }
   });
};

module.exports = activate_admin;
