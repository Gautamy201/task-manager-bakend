const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const isUser = require("../midleware/isUser");

//  router for create new user account
router.post("/sign-up", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // check if user email already exist
    const existUser = await User.findOne({
      email,
    });
    if (existUser) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
  }
});

// router for user login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // check if password match
    const isValidPassword = await bcrypt.compare(password, isUser.password);

    if (!isValidPassword) {
      return res.status(450).json({
        message: "Incorrect password",
      });
    }

    // generate token

    const token = jwt.sign(
      {
        _id: isUser._id,
        fullname: isUser.fullname,
        email: isUser.email,
      },
      "task-manager code with master",
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// fetchUser

router.get("/userDetail", isUser, (req, res) => {
  res.status(200).json({
    data: req.user,
  });
});

// update profile pic

router.patch("/profile-pic", isUser, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      userImgUrl: req.body.userImgUrl,
    });
    res.json({
      message: "Profile pic updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
