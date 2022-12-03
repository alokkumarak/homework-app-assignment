const express =require('express');

const router=express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = mongoose.model("users");

const Mustsignin = require("../middleWares/loginMiddleware.js");

router.get("/mustsignin", Mustsignin, (req, res) => {
  res.send("hello signed in user");
});

router.post("/signup", (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.status(405).json({ error: "all are required field" });
  }
  if (password != confirmPassword) {
    return res
      .status(405)
      .json({ error: "password and confirm password must be same!!" });
  }
  users
    .findOne({ email: email })
    .then((saveUser) => {
      if (saveUser) {
        return res
          .status(405)
          .json({ error: "user already exist with this email id" });
      }
      bcrypt.hash(password, 15).then((hashedPassword) => {
        const user = new users({
          email,
          password: hashedPassword,
        });
        user
          .save()
          .then((user) => {
            
            res.json({ message: "successfully registered with Instagram" });
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
});


router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(405).json({ error: "Enter email and password" });
  }
  users
    .findOne({ email: email })
    .then((presendUser) => {
      if (!presendUser) {
        return res.status(405).json({ error: "Invalid email and password" });
      }
      //compare password with bcryptpassword
      bcrypt
        .compare(password, presendUser.password)
        .then((ifMatchedPassword) => {
          if (ifMatchedPassword) {
            const generateToken = jwt.sign(
              { _id: presendUser._id },
              process.env.JSON_WEB_TOKEN
            );
            const { _id, email } = presendUser;
            res.json({
              token: generateToken,
              message: "successfully logged in !!!",
              user: { _id, email },
            });
          } else {
            res.status(405).json({ error: "Invalid email and password" });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    })
    .catch((error) => {
      console.log(error.message);
    });
});

module.exports = router;
