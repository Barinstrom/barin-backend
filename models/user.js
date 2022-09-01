const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator');

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
  school: {
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
    enum: ['Pending', 'Active'],
    default: 'Pending'
  },
  confirmationCode: {
    type: String,
    unique: true
  }
});

const userModel = mongoose.model("User", userSchema, "User");

module.exports = userModel;
