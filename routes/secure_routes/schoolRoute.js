const express = require("express");
const router = express.Router();

const verifyToken = require('../../middleware/verifyToken');
const verifySchool = require('../../middleware/verifySchool');
const verifyRole = require('../../middleware/verifyRole');
const studentRoute = require("../../models/student");
const teacherRoute = require("../../models/teacher");
const adminRoute = require("../../models/admin");

router.use(verifyToken);
router.use(verifySchool);
// ถ้า school ผิด จะไม่ next() ต่อ

router.use('/student',verifyRole('student'),studentRoute);
router.use('/teacher',verifyRole('teacher'),teacherRoute);
router.use('/admin',verifyRole('admin'),adminRoute);

module.exports = router;
