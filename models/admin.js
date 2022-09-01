const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator')

const AdminSchema = new Schema({
    userId: {
        type: mongoose.ObjectId,
        required: true,
        unique: true,
    },
    tel: String,
});

module.exports = mongoose.model("Admin",AdminSchema);