const StudentModel = require("../../models/student");
const mongoose = require("mongoose");

const updateStudent = async (req, res) => {
    await StudentModel.findOneAndUpdate({ userID: new mongoose.mongo.ObjectId(req.body.userID) }, { $set: req.body })
        .then(() => {
            res.send("Edit student success.");
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

module.exports = updateStudent;