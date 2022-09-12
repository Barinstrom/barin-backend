const TeacherModel = require("../../models/teacher");
const mongoose = require("mongoose");

const updateTeacher = async (req, res) => {
    const teacher = await TeacherModel.findOne({ userID: new mongoose.mongo.ObjectId(req.body.userID) })
    if (!teacher) {
        return res.status(400).send("Invalid userID")
    }
    await TeacherModel.findOneAndUpdate({ userID: new mongoose.mongo.ObjectId(req.body.userID) }, { $set: req.body })
        .then(() => {
            res.json({'success': true});
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

module.exports = updateTeacher;