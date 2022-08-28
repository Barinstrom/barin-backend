const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')

const AdminSchema = new Schema({
    _id: false,
    _id: {
        type: mongoose.ObjectId,
        required: true,
        unique: true,
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
});

module.exports = mongoose.model("Admin",AdminSchema);