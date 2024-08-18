const jwt = require("jsonwebtoken");
const jwt_secret = "task-manager code with master";
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwt_secret);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "You are not authorized to access this resource.",
    });
  }
};
