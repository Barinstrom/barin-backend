const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HostSchema = new Schema({
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
});

module.exports = mongoose.model("Host",HostSchema);