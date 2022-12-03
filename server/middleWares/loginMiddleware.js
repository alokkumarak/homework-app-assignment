const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const users = mongoose.model("users");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

 
  if (!authorization) {
    return res.status(404).json({ error: "You need to login first..." });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JSON_WEB_TOKEN, (error, payload) => {
    if (error) {
      return res.status(401).json({ error: "token verification error" });
    }

    const { _id } = payload;
    users.findById(_id).then((serverData) => {
      req.user = serverData;
      next();
    });
  });
};
