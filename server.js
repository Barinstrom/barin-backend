const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const School = require("./models/school");
const Product = require("./models/product");
const routes = require("./routes/routes");
const authRoutes = require("./routes/secure_routes");
const cors = require('cors');
const session = require('express-session');

require("dotenv").config();
require('./config/passport')(passport)


mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
});


app.use(express.json());
app.use(routes);
app.use(cors())
app.use(session({ 
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  "/auth",
  passport.authenticate("jwt", { session: false }),
  authRoutes
);

app.post("/products", async (req, res) => {
  const payload = req.body;
  const product = new Product(payload);
  await product.save();
  res.status(201).end();
});

app.post("/schools", async (req, res) => {
  const payload = req.body;
  const school = new School(payload);
  await school.save();
  res.status(201).end();
});

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/hello", (req, res) => {
  const { name } = req.query;
  res.json({ name: name });
});
app.listen(process.env.PORT, () => {
  console.log("Start server at port 3000.");
});
