const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const School = require("./models/school");
const routes = require("./routes/routes");
const authRoutes = require("./routes/secure_routes");
const port = process.env.PORT || 54321
const cors = require('cors');
const session = require('express-session');

require("dotenv").config();
require('./config/passport')(passport)

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
});

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// unsecured routes
app.use(routes);

app.use(session({ 
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET 
}));
app.use(passport.initialize());
app.use(passport.session());
// '/auth' => secured route
app.use(
  "/auth",
  passport.authenticate("jwt", { session: false }),
  authRoutes
);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/hello", (req, res) => {
  const { name } = req.query;
  res.json({ name: name });
});
app.listen(port, () => {
  console.log(`Start server at port ${port}.`);
});
