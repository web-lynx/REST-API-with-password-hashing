const bcrypt = require("bcryptjs");
const User = require("../user/userModel");
const jwt = require("jsonwebtoken");

exports.hashPass = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

//New password-decrypting middleware
exports.decryptPass = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (await bcrypt.compare(req.body.password, user.password)) {
      next();
    } else {
      throw new Error("Incorrect credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

//JWT-based persistent login token checker
exports.checkToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(decodedToken._id);
    if (req.user) {
      next();
    } else {
      throw new Error("No user found");
    }
    console.log(User);
    console.log(decodedToken);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
