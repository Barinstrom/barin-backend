const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const RequestSchema = new Schema({
   schoolID: {
      type: String,
      required: true,
   },
   studentID: {
      type: mongoose.ObjectId,
      required: true,
      unique: true,
   }, 
   detail: {
      type: String,
      required: true,
   },
   vote: {
      type: Number,
      required: true,
   },
});

RequestSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Request", RequestSchema);
