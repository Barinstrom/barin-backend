const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const schoolSchema = new Schema({
   schoolID: {
      type: String,
      required: true,
      unique: true,
   },
   schoolName: {
      type: String,
      required: true,
      unique: true,
   },
   urlCertificateDocument: {
      type: String,
      required: true,
   },
   paymentStatus: {
      // หมดรอบเปลี่ยน paymentStatus เป็น pending
      // (pending จะไม่ส่งกลับให้ frontend)
      type: String,
      enum: ["success", "pending"],
      default: "pending",
   },
   status: {
      type: String,
      enum: ["approve", "pending", "not_approve"],
      default: "pending",
   },
   paymentDate: {
      // update ทับทุกปี
      type: Date,
      require: true,
   },
   requests: [mongoose.ObjectId],
   clubs: [mongoose.ObjectId],
   schedule: {
      schoolYear: Number,
      registerDate: Date,
      endOfRegisterDate: Date,
      endOfSchoolYear: Date,
   },
   urlLogo: String,
   bgColor: String,
   adminID: [mongoose.ObjectId],
});

schoolSchema.plugin(mongoosePaginate);

const SchoolModel = mongoose.model("School", schoolSchema);

module.exports = SchoolModel;
