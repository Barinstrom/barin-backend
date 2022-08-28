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
  count: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
    required: true,
  },
  schedule: [String],
  reviews: [mongoose.Types.ObjectId()],
  picture: {
    pictureID: Number,
    urlPicture: String,
  },
});

module.exports = mongoose.model("Club", ClubSchema);

