const express = require("express");
const router = express.Router();

//const profile = require("./users/profile");
const schoolRoute = require('./schoolRoute');

// path => /auth/:school/:role/operation (เพราะมันเช็คง่ายกว่า)
// ตอนทำจริงอาจไม่ต้องมี role ขั้นเพราะมีหลายๆ operation ที่ใช้ร่วมกันได้ (เปลี่ยนไม่ยาก)
router.use("/:school",schoolRoute);


module.exports = router;