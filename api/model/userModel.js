const mongoose = require("mongoose");

const userSchem = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  userImgUrl: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchem);
