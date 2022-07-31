const express = require("express");
const app = express();
const mongoose = require("mongoose");
const School = require("./models/school");
const Product = require("./models/product");
mongoose.connect("mongodb://localhost:27017/barin", {
  useNewUrlParser: true,
});

app.use(express.json());

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
app.listen(3000, () => {
  console.log("Start server at port 3000.");
});
