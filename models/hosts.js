const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const HostSchema = new Schema({
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
});

HostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Host", HostSchema);
