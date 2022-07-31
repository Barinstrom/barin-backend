const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
  name: String,
  role: Number,
});

const SchoolModel = mongoose.model("School", schoolSchema);

module.exports = SchoolModel;
