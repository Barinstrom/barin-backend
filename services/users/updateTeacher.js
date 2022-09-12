const TeacherModel = require("../../models/teacher");
const mongoose = require("mongoose");

const updateTeacher = async (req, res) => {
    await TeacherModel.findOneAndUpdate({ userID: new mongoose.mongo.ObjectId(req.body.userID) }, { $set: req.body })
        .then(() => {
            res.send("Edit teacher success.");
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

module.exports = updateTeacher;