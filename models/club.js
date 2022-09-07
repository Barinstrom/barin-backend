const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  clubName: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  clubInfo: {
    type: String,
  },
  limit: {
    type: Number,
    required: true,
  },
  teacherId: [mongoose.ObjectId],
  schoolYear: {
    type: Number,
    required: true,
  },
  schedule: [String],
  reviews: [mongoose.ObjectId],
  picture: {
    pictureID: Number,
    urlPicture: String,
  },
});

module.exports = mongoose.model("Club", ClubSchema);

