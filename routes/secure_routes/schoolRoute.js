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

const queryUser = require("../../services/users/queryUser");
const addClub = require("../../services/users/addClub");
const registerClub = require("../../services/users/registerClub");
const addReview = require("../../services/users/addReview");
const updateReview = require("../../services/users/updateReview");
const getStudentOwnClubs = require("../../services/users/getStudentOwnClubs");
const getTeacherOwnClubs = require("../../services/users/getTeacherOwnClubs");
const getStudentPastClubs = require("../../services/users/getStudentPastClubs")
const editSchool = require("../../services/users/system_admin/schoolEdit");
const addTeacher = require("../../services/users/addTeacher");
const addTeachers = require("../../services/users/addTeachers");
const addStudent = require("../../services/users/addStudent");
const querySchool = require("../../services/users/querySchool");
//router.use('/admin',verifyRole('admin'),adminRoute);
router.get(
   "/user",
   verifyRole("host", "admin", "teacher", "student"),
   queryUser
);
router.post("/add-club", verifyRole("host", "admin"), addClub);
router.post("/add-student", verifyRole("host", "admin"), addStudent);
router.post("/add-teacher", verifyRole("host", "admin"), addTeacher);
router.post("/add-teachers", verifyRole("host", "admin"), addTeachers);
router.post("/add-review",verifyRole("host", "admin", "teacher", "student"),addReview);
router.post("/register-club",verifyRole("student"),registerClub);
router.post("/update-review",verifyRole("host", "admin", "teacher", "student"),updateReview);
router.post("/edit", verifyRole("host", "admin"), editSchool);
router.get("/student/ownclub", verifyRole("student"), getStudentOwnClubs);
router.get("/teacher/ownclubs", verifyRole("teacher"), getTeacherOwnClubs);
<<<<<<< HEAD
router.get("/student/pastclubs", verifyRole("student"), getStudentPastClubs);
=======
router.get("/get-school", verifyRole("host", "admin"), querySchool);
>>>>>>> 9895d67cfcefd357650c2075e4117e5a82195b77

module.exports = router;
