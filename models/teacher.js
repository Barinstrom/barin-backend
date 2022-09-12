const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const TeacherSchema = new Schema({
   userID: {
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
   tel: String,
   clubs: [mongoose.ObjectId],
});

TeacherSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Teacher", TeacherSchema);
