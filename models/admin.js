const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const validator = require("validator");

const AdminSchema = new Schema({
   userID: {
      type: mongoose.ObjectId,
      required: true,
      unique: true,
   },
   tel: String,
});

AdminSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Admin", AdminSchema);
