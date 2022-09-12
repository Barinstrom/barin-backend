const StudentModel = require("../../models/student");
const UserModel = require("../../models/user");

const getStudent = (req, res) => {
   const ans = await.UserModel.find({ user: `${req.param.schoolID}` });
   res.json(ans);
};

module.exports = { getStudent };
