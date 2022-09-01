const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterLogSchema = new Schema({
    studentId: {
        type: mongoose.ObjectId,
        required: true,
    },
    clubId: {
        type: mongoose.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: ['studying', 'dropped', 'inPast'],
        required: true,
    },
});

module.exports = mongoose.model("RegisterLog",RegisterLogSchema);