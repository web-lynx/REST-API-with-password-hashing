const bcrypt = require("bcryptjs");
const User = require("../user/userModel");
const jwt = require("jsonwebtoken");

exports.hashPass = async (req, res, next) => {
  try {
    if (req.body.newpassword) {
      req.body.password = await bcrypt.hash(req.body.newpassword, 8);
    } else if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
    } else {
      throw new error();
    }
    console.log(req.body);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

//New password-decrypting middleware
exports.decryptPass = async (req, res, next) => {
  try {
    req.user = await User.findOne({ username: req.body.username });
    if (await bcrypt.compare(req.body.password, req.user.password)) {
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
    const decodedToken = await jwt.verify(
      req.header("Authorization").replace("Bearer ", ""),
      process.env.SECRET
    );
    req.user = await User.findById(decodedToken._id);
    console.log(req.body, req.user);
    if (req.user) {
      next();
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
