const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')

const TeacherSchema = new Schema({
    _id: false,
    _id: {
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
    clubs: [mongoose.ObjectId],
});

module.exports = mongoose.model("Teacher",TeacherSchema);