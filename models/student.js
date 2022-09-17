const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const StudentSchema = new Schema({
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
   enteredYear: {
      type: Number,
      required: true,
   },
   classYear: {
      type: Number,
      required: true,
   },
   isActive: {
      type: String,
      enum: ["Not-active", "Active", "Pending"],
      default: "Pending",
   },
   tel: String,
   //reviews: [mongoose.ObjectId],
   // request.find({ _id: { $in: followedIDs } }) to query request
   //requests: [mongoose.ObjectId],
   clubs: [
      // 6 record
      {
         clubID: mongoose.ObjectId,
         status: {
            type: String,
            enum: ["Pass", "Fail", "Studying"],
            default: "Studying",
         },
         studyYear: Number,
      },
   ],
});

StudentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Student", StudentSchema);
