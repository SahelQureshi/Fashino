const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const debg = require("debug");
const {generateToken}=require('../utils/generateToken')

module.exports.registerUser=async (req, res) => {
  try {
    let { first_name, last_name, user_name, email, contact_no, password } =
      req.body;
    const userEmail = await userModel.findOne({ email: email });
    const userName = await userModel.findOne({ user_name: user_name });
    if (userEmail != null || userName != null) {
      return res.status(500).send("Email or Username is already present.");
    }

    const createdUser = await userModel.create({
      first_name,
      last_name,
      user_name,
      email,
      contact_no,
    });

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async (err, hash) => {
        createdUser.password = hash;
        await createdUser.save();
        res.redirect("/users/login");
      });
    });
  } catch (err) {
    console.log(err.message);
  }
}

module.exports.loginUser= async (req, res) => {
  try {
    let { user_name, password } = req.body;
    let user = await userModel.findOne({ user_name: user_name });
    if (!user) {
      return res.status(504).send("something went wrong");
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(504).send("something went wrong");
    }

    const token= generateToken(user);

     // 4. Send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production HTTPS
      sameSite: "lax"
    });

    res.status(200).send("User loging succesfully");
  } catch (error) {
    console.log(error.message);
  }
}