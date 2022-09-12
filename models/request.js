const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

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

RequestSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Request", RequestSchema);
