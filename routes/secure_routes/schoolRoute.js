const express = require("express");
const router = express.Router();

const verifyRole = require('../../middleware/verifyRole');
const studentRoute = require("./student");
const teacherRoute = require("./teacher");
const adminRoute = require("./admin");

router.get('/test',verifyRole('admin'),)
router.use('/student',verifyRole('student'),studentRoute);
router.use('/teacher',verifyRole('teacher'),teacherRoute);
router.use('/admin',verifyRole('admin'),adminRoute);

module.exports = router;
