const express = require("express");
const router = express.Router();

const verifyRole = require("../../middleware/verifyRole");
const queryUser = require("../../services/users/queryUser");
const addClub = require("../../services/users/addClub");
const addReview = require("../../services/users/addReview");
const getStudentOwnClubs = require("../../services/users/getStudentOwnClubs");
const editSchool = require("../../services/users/system_admin/schooledit");
const addTeacher = require("../../services/users/addTeacher");
//const addTeachers = require("../../services/users/addTeachers");
const getTeacherOwnClubs = require("../../services/users/getTeacherOwnClubs");
const addStudent = require("../../services/users/addstudent");

//router.use('/admin',verifyRole('admin'),adminRoute);
router.get(
   "/user",
   verifyRole("host", "admin", "teacher", "student"),
   queryUser
);
router.post("/add-club", verifyRole("host", "admin"), addClub);
router.post("/add-student", verifyRole("host", "admin"), addStudent);
router.post("/add-teacher", verifyRole("host", "admin"), addTeacher);
//router.post('/add-teachers',verifyRole('host','admin'),addTeachers);
router.post(
   "/review",
   verifyRole("host", "admin", "teacher", "student"),
   addReview
);
router.get("/ownclub", verifyRole("student"), getStudentOwnClubs);
router.post("/edit", verifyRole("host", "admin"), editSchool);
router.get("/teacher/ownclubs", verifyRole("teacher"), getTeacherOwnClubs);

module.exports = router;
