const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
  schoolID: {
    type: String,
    required: true,
    unique: true,
  },
  schoolName: {
    type: String,
    required: true,
    unique: true,
  },
  urlCertificateDocument: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['success', 'pending'],
    required: true,
  },
  status: {
    type: String,
    enum: ['success', 'pending','reject'],
    required: true,
  },
  enteredDate: {
    type: Date,
    require: true,
  },
  requests: [mongoose.ObjectId],
  clubs: [mongoose.ObjectId],
  schedule: {
    registerDate: Date,
    endOfSchoolYear: Date,
  },
  urlLogo: String,
  bgColor: String,
  schedule: [mongoose.ObjectId],
  adminID: [mongoose.ObjectId],
});

const SchoolModel = mongoose.model("School", schoolSchema);

module.exports = SchoolModel;
