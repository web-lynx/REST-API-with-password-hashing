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
    req.user = await User.findOne({ _id: decodedToken._id });
    if (req.user) {
      next();
    } else {
      throw new Error("Invalid token");
    }
    console.log(User);
    console.log(decodedToken);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
