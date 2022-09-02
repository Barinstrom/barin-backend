const express = require("express");
const router = express.Router();
const userService = require("../../services/users");
router.get('/',(req,res)=>{
    res.send('hello from admin')
})

router.get('/profile', async (req,res) => {
    const _user = await userService.getUserWithoutPassword(req.user._id);
    return res.json({success: true, data: _user });
})

module.exports = router ;