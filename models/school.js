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
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  enteredDate: {
    type: Date,
    require: true,
  },
  requests: [mongoose.Types.ObjectId()],
  clubs: [mongoose.Types.ObjectId()],
  schedule: {
    registerDate: Date,
    endOfSchoolYear: Date,
  },
  urlLogo: String,
  bgColor: String,
});

const SchoolModel = mongoose.model("School", schoolSchema);

module.exports = SchoolModel;
