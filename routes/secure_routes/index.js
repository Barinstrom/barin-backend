const express = require("express");
const router = express.Router();
const schoolRoute = require("./schoolRoute");
const getApprovedSchool = require("../../services/users/system_admin/getApprovedSchool");
const getPendingSchool = require("../../services/users/system_admin/getPendingSchool");
const getNotApprovedSchool = require("../../services/users/system_admin/getNotApprovedSchool");

const verifyToken = require("../../middleware/verifyToken");
const verifySchool = require("../../middleware/verifySchool");
const verifyRole = require("../../middleware/verifyRole");

router.use(verifyToken);
//const profile = require("./users/profile");

router.get("/schools/approved", verifyRole("host"), getApprovedSchool);
router.get("/schools/pending", verifyRole("host"), getPendingSchool);
router.get("/schools/not-approved", verifyRole("host"), getNotApprovedSchool);

router.use("/:school", verifySchool, schoolRoute);

router.get("/", (req, res) => {
   res.send("auth");
});

module.exports = router;
