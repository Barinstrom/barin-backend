const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const ClubSchema = new Schema({
   clubName: {
      type: String,
      required: true,
      unique: true,
   },
   groupID: {
      type: String,
      required: true,
   }, // foreign key เชื่อม club เก่า
   schoolID: {
      type: String,
      required: true,
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
   schoolYear: {
      type: Number,
      required: true,
   },
   schedule: [String],
   //reviews: [mongoose.ObjectId],
   picture: {
      pictureID: Number,
      urlPicture: String,
   },
});

ClubSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Club", ClubSchema);
