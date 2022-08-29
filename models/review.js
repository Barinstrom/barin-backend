const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  textReview: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('Review',ReviewSchema);
