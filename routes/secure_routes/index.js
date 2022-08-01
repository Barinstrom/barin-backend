const express = require("express");
const router = express.Router();

const profile = require("./users/profile");

router.use("/profile", profile);

router.route("").get((req, res) => {
  return res.send("Welcome to authed routes");
});

module.exports = router;