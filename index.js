const express = require("express");
// const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { registerValidation } = require("./validations/auth");
const { validationResult } = require("express-validator");
const UserModel = require("./models/User");

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.x8oza.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("db ok");
  })
  .catch((err) => {
    console.log("db err: ", err);
  });

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("helfsfsl d do");
});

app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const pass = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(pass, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      hashPassword,
      avatarUrl: req.body.avatarUrl,
    });
    const user = await doc.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Auth failed",
    });
  }
});

app.listen(2222, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log("ok");
});
