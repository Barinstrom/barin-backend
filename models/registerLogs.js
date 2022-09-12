const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const RegisterLogSchema = new Schema({
   studentID: {
      type: mongoose.ObjectId,
      required: true,
   },
   clubID: {
      type: mongoose.ObjectId,
      required: true,
   },
   action: {
      type: String,
      enum: ["register", "drop"],
      required: true,
   },
   date: {
      type: Date,
      required: true,
   },
});
RegisterLogSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("RegisterLog", RegisterLogSchema);
