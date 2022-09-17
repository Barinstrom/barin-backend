const express = require("express");
const router = express.Router();

const verifyRole = require("../../middleware/verifyRole");

const queryUser = require("../../services/users/queryUser");
const querySchool = require("../../services/users/querySchool");
const queryData = require("../../services/users/queryData");
const addClub = require("../../services/users/addClub");
const registerClub = require("../../services/users/registerClub");
const addReview = require("../../services/users/addReview");
const updateReview = require("../../services/users/updateReview");
const getReview = require("../../services/users/getReviews");
const getStudentOwnClubs = require("../../services/users/getStudentOwnClubs");
const getTeacherOwnClubs = require("../../services/users/getTeacherOwnClubs");
const getStudentPastClubs = require("../../services/users/getStudentPastClubs");
const editSchool = require("../../services/users/system_admin/schoolEdit");
const editAdmin = require("../../services/users/system_admin/adminEdit");

const addTeacher = require("../../services/users/addTeacher");
const addTeachers = require("../../services/users/addTeachers");
const addStudent = require("../../services/users/addStudent");
const addStudents = require("../../services/users/addStudents");
const updateStudent = require("../../services/users/updateStudent");
const updateTeacher = require("../../services/users/updateTeacher");
const updateClub = require("../../services/users/updateClub");
const deleteClubs = require("../../services/users/deleteClubs");
const setSchedule = require("../../services/users/setSchedule");

router.get(
   "/data",
   verifyRole("host", "admin", "teacher", "student"),
   queryData
);
router.post("/add-club", verifyRole("host", "admin"), addClub);
router.post("/add-student", verifyRole("host", "admin"), addStudent);
router.post("/add-students", verifyRole("host", "admin"), addStudents);
router.post("/add-teacher", verifyRole("host", "admin"), addTeacher);
router.post("/add-teachers", verifyRole("host", "admin"), addTeachers);
router.post(
   "/add-review",
   verifyRole("host", "admin", "teacher", "student"),
   addReview
);
router.post("/register-club", verifyRole("student"), registerClub);
router.patch(
   "/update-review",
   verifyRole("host", "admin", "teacher", "student"),
   updateReview
);
router.get(
   "/get-review",
   verifyRole("host", "admin", "teacher", "student"),
   getReview
);
router.patch("/edit", verifyRole("host", "admin"), editSchool);
router.patch("/edit_admin", verifyRole("host", "admin"), editAdmin);
router.get("/student/ownclub", verifyRole("student"), getStudentOwnClubs);
router.get("/teacher/ownclubs", verifyRole("teacher"), getTeacherOwnClubs);
router.get("/student/pastclubs", verifyRole("student"), getStudentPastClubs);
// router.get("/get-school", verifyRole("host", "admin"), querySchool);
router.patch("/update-student", verifyRole("host", "admin"), updateStudent);
router.patch("/update-teacher", verifyRole("host", "admin"), updateTeacher);
router.patch(
   "/update-club",
   verifyRole("teacher", "host", "admin"),
   updateClub
);
router.delete("/delete-clubs", verifyRole("host", "admin"), deleteClubs);
router.patch("/set-schedule", verifyRole("host", "admin"), setSchedule);

module.exports = router;
