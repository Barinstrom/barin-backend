const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new Schema({
   email: {
      type: String,
      validate: {
         validator: (v) => {
            return validator.isEmail(v);
         },
         message: (props) => `${props.value} is not a valid email`,
      },
      required: [true, "email required !"],
   },
   schoolID: {
      type: String,
      required: [true, "schoolId required !"],
   },
   password: {
      type: String,
      required: [true, "password required !"],
   },
   role: {
      type: String,
      required: [true, "role required !"],
   },
   status: {
      type: String,
      enum: ["Pending", "Active"],
      default: "Pending",
   },
   confirmationCode: {
      type: String,
      unique: true,
   },
   resetToken: {
      type: String,
   },
});

userSchema.plugin(mongoosePaginate);
// const userModel = mongoose.model("User", userSchema, "User");
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
