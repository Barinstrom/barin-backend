const User = require("../models/user");
const verifyUser = async (req, res, next) => {
  let user = await User.findOneAndUpdate(
    {
      confirmationCode: req.params.confirmationCode,
    },
    {
      status: "Active",
      $unset: { confirmationCode: ""}
    },
    {
      new: true,
    }
  );
  if (user) {
    return res.status(200).send({ message: "Activate finish" });
  } else {
    return res.status(404).send({ message: "User Not found." });
  }
};

module.exports = verifyUser;
