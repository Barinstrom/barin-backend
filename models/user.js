const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema({
  userId: {
    type: String,
    required: [true, "userId required !"],
  },
  password: {
    type: String,
    required: [true, "password required !"],
  },
  role: {
    type: String,
    required: [true, "role required !"],
  },
  tel: String,
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
});

const userModel = mongoose.model("User", userSchema,"User");

module.exports = userModel;