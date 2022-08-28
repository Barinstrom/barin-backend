const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  detail: {
    type: String,
    required: true,
  },
  vote: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model('Request',RequestSchema);
