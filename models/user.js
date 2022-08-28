const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {
    type: String,
    required: [true, "userId required !"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "password required !"],
  },
  role: {
    type: String,
    required: [true, "role required !"],
  },
  school: {
    type: String,
  }

});

const userModel = mongoose.model("User", userSchema, "User");

module.exports = userModel;
