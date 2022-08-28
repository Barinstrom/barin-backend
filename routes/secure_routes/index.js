const express = require("express");
const router = express.Router();

const verifyToken = require('../../middleware/verifyToken');
const verifySchool = require('../../middleware/verifySchool');

router.use(verifyToken);
//const profile = require("./users/profile");
const schoolRoute = require('./schoolRoute');

// path => /auth/:school/:role/operation (เพราะมันเช็คง่ายกว่า)
// ตอนทำจริงอาจไม่ต้องมี role ขั้นเพราะมีหลายๆ operation ที่ใช้ร่วมกันได้ (เปลี่ยนไม่ยาก)
router.use("/:school",verifySchool,schoolRoute);

router.get('/',(req,res)=>{
    res.send('auth');
})


module.exports = router;