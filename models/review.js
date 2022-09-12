const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const ReviewSchema = new Schema({
   textReview: {
      type: String,
      required: true,
   },
   groupID: {
      type: String,
      required: true,
   },
   studentID: {
      type: mongoose.ObjectId,
      required: true,
   }, 
});

ReviewSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Review", ReviewSchema);
