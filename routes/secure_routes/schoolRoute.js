const express = require("express");
const router = express.Router();

const verifyRole = require("../../middleware/verifyRole");

const queryData = require("../../services/users/queryData");
const addClub = require("../../services/users/addClub");
const addClubs = require("../../services/users/addClubs");
const registerClub = require("../../services/users/registerClub");
const dropClub = require("../../services/users/dropClub");
const addReview = require("../../services/users/addReview");
const updateReview = require("../../services/users/updateReview");
const getReview = require("../../services/users/getReviews");
const getStudentOwnClubs = require("../../services/users/getStudentOwnClubs");
const getTeacherOwnClubs = require("../../services/users/getTeacherOwnClubs");
const getStudentPastClubs = require("../../services/users/getStudentPastClubs");
const editSchool = require("../../services/users/system_admin/schoolEdit");
const editAdmin = require("../../services/users/system_admin/adminEdit");
const getSchoolStudent = require("../../services/users/getSchoolStudent");
const getSchoolTeacher = require("../../services/users/getSchoolTeacher");
const getClubStudent = require("../../services/users/getClubStudent");
const getClubTeachers = require("../../services/users/getClubTeachers");
const getSchoolClubs = require("../../services/users/getSchoolclubs");
const getSchoolClubsName = require("../../services/users/getSchoolClubsName");

const addTeacher = require("../../services/users/addTeacher");
const addTeachers = require("../../services/users/addTeachers");
const addStudent = require("../../services/users/addStudent");
const addStudents = require("../../services/users/addStudents");
const updateStudent = require("../../services/users/updateStudent");
const updateTeacher = require("../../services/users/updateTeacher");
const updateClub = require("../../services/users/updateClub");
const deleteClubs = require("../../services/users/deleteClubs");
const setSchedule = require("../../services/users/setSchedule");
const updateSchool = require("../../services/users/updateSchool");

router.get(
   "/data",
   verifyRole("host", "admin", "teacher", "student"),
   queryData
);
router.post("/add-club", verifyRole("host", "admin"), addClub);
router.post("/add-clubs", verifyRole("host", "admin"), addClubs);
router.post("/add-student", verifyRole("host", "admin"), addStudent);
router.post("/add-students", verifyRole("host", "admin"), addStudents);
router.post("/add-teacher", verifyRole("host", "admin"), addTeacher);
router.post("/add-teachers", verifyRole("host", "admin"), addTeachers);
router.post("/add-review", verifyRole("student"), addReview);
router.post("/register-club", verifyRole("student"), registerClub);
router.post("/drop-club", verifyRole("student"), dropClub);
router.patch("/update-review", verifyRole("student"), updateReview); //not use
router.get(
   "/get-review",
   verifyRole("host", "admin", "teacher", "student"),
   getReview
);
router.get(
   "/clubs",
   verifyRole("host", "admin", "teacher", "student"),
   getSchoolClubs
);
router.get(
   "/clubs-name",
   verifyRole("host", "admin", "teacher", "student"),
   getSchoolClubsName
);
router.get(
   "/students",
   verifyRole("host", "admin", "teacher", "student"),
   getSchoolStudent
);
router.get(
   "/teachers",
   verifyRole("host", "admin", "teacher", "student"),
   getSchoolTeacher
);
router.get(
   "/club/students",
   verifyRole("host", "admin", "teacher", "student"),
   getClubStudent
);
router.get(
   "/club/teachers",
   verifyRole("host", "admin", "teacher", "student"),
   getClubTeachers
);
router.patch("/edit", verifyRole("host", "admin"), editSchool);
router.patch("/edit_admin", verifyRole("host", "admin"), editAdmin);
router.get("/student/ownclub", verifyRole("student"), getStudentOwnClubs);
router.get("/teacher/ownclubs", verifyRole("teacher"), getTeacherOwnClubs);
router.get("/student/pastclubs", verifyRole("student"), getStudentPastClubs);
router.patch("/update-student", verifyRole("host", "admin"), updateStudent);
router.patch("/update-teacher", verifyRole("host", "admin"), updateTeacher);
router.patch(
   "/update-club",
   verifyRole("teacher", "host", "admin"),
   updateClub
);
router.patch("/update-school", verifyRole("host", "admin"), updateSchool);
router.delete("/delete-clubs", verifyRole("host", "admin"), deleteClubs);
router.patch("/set-schedule", verifyRole("host", "admin"), setSchedule);

module.exports = router;
