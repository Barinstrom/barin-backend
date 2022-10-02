const userModel = require("../../../models/user");
const studentModel = require("../../../models/student");
const teacherModel = require("../../../models/teacher");
const clubModel = require("../../../models/club");
const logModel = require("../../../models/registerLogs");
const reviewModel = require('../../../models/review')

const deleteAll = async (req,res) => {
    const schoolID = req.params.schoolID;
    const _user = userModel.find({schoolID}).exec();
    for(let i=0;i<_user.length;i++){
        if(_user.role=="admin"){
            continue;
        }
        else if(_user.role=="student"){
            studentModel.findOneAndDelete({userID:_user._id});
        }
        else if(_user.role=="teacher"){
            teacherModel.findOneAndDelete({userID:_user._id});
        }
        userModel.findByIdAndDelete(_user._id);
    }
    const _clubs = clubModel.find({schoolID}).exec();
    for(let i=0;i<_clubs.length;i++){
        reviewModel.deleteMany({groupID:_clubs.groupID});
        logModel.deleteMany({clubID:_clubs._id});
        clubModel.findByIdAndDelete(_clubs._id);
    }
    res.send({"success":true})
}

module.exports = deleteAll;