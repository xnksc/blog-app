const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.x8oza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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

app.post("/auth/register", (req, res) => {
  
});

app.listen(2222, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log("ok");
});
