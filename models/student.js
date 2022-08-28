const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')

const StudentSchema = new Schema({
    _id: false,
    userID: {
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
    email: {
        type: String,
        validate: {
            validator: (v) => {
                return validator.isEmail(v);
            },
            message: (props) => `${props.value} is not a valid email`,
        },
        required: [true, "email required !"],
    },
    club: [{
        clubID: mongoose.ObjectId,
        status: Number,
        studyYear: String,
    }],
    reviews: [mongoose.ObjectId],
    // request.find({ _id: { $in: followedIDs } }) to query request
    requests: [mongoose.ObjectId],
});

module.exports = mongoose.model("Student",StudentSchema);