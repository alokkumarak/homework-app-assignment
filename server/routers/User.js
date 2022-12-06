const express=require('express')
const router=express.Router()
const mongoose =require('mongoose')
const User = mongoose.model("users");

router.get("/allusers", (req, res) => {
  User.find()
    .sort("-createdAt")
    .then((users) => {
      res.json({ users });
    })
    .catch((error) => {
      console.log(error.message);
    });
});

module.exports = router;