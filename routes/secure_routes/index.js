const express = require("express");
const router = express.Router();
const schoolRoute = require("./schoolRoute");
const SchoolModel = require("../../models/school");
const getApprovedSchool = require("../../services/users/system_admin/getApprovedSchool");
const getPendingSchool = require("../../services/users/system_admin/getPendingSchool");
const getNotApprovedSchool = require("../../services/users/system_admin/getNotApprovedSchool");
const getIntent = require("../../services/users/getIntent");
const payment = require("../../services/users/payment");
const deleteAll = require("../../services/users/system_admin/deleteAll");

const verifyToken = require("../../middleware/verifyToken");
const verifySchool = require("../../middleware/verifySchool");
const verifyRole = require("../../middleware/verifyRole");

const editSchool = require("../../services/users/system_admin/schoolEdit");
router.use(verifyToken);
//const profile = require("./users/profile");
router.patch("/update-school", verifyRole("host","admin"), editSchool);
router.delete("/:schoolID/delete-all", verifyRole("host"), deleteAll);
router.get("/schools/approved", verifyRole("host"), getApprovedSchool);
router.get("/schools/pending", verifyRole("host"), getPendingSchool);
router.get("/schools/not-approved", verifyRole("host"), getNotApprovedSchool);
router.get("/school/get-status", async (req, res) => {
   const _school = await SchoolModel.findOne({
      schoolID: req.userInfo.schoolID,
   });
   const result = {
      ..._school,
      role: req.userInfo.role,
      email: req.userInfo.email,
   };
   res.send(result);
});
router.get("/get-intent", verifyRole("admin"), getIntent);
router.get("/payment", verifyRole("admin"), payment);
// เพิ่ม จ่ายเงิน กับ ดูสถานะโรงเรียนไม่ต้องมี /:schoolID

router.use("/:schoolID", verifySchool, schoolRoute);

router.get("/", (req, res) => {
   res.send("auth");
});

module.exports = router;
