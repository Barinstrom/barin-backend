const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    userId: {
        type: mongoose.ObjectId,
        required: true,
        unique: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    enteredYear: {
        type: String,
        required: true,
    },
    classYear: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Number,
        required: true,
    },
    tel: String,
    reviews: [mongoose.ObjectId],
    // request.find({ _id: { $in: followedIDs } }) to query request
    requests: [mongoose.ObjectId],
    clubs: [mongoose.ObjectId],
});

module.exports = mongoose.model("Student",StudentSchema);