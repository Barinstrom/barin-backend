const UserModel = require("../../models/user");
const TeacherModel = require("../../models/teacher");
const getTeacherName = async (req, res) => {
    const {
        email
    } = req.query;
    if (!email) {
        return res.status(400).json({
            "success": false,
            "message": "email not send on params."
        })
    }
    const _user = await UserModel.findOne({
        email
    })
    if (!_user) {
        return res.status(400).json({
            "success": false,
            "message": "email not found on Teacher."
        })
    }
    const _teacher = await TeacherModel.findOne({
            userID: _user._id
        }).select("firstname lastname -_id")
        .lean();

    if (_teacher)
        return res.json({
            _teacher
        })
    else
        return res.status(400).json({
            "success": false,
            "message": "teacher not found (database failed)."
        })

};
module.exports = getTeacherName;