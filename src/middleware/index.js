const bcrypt = require("bcryptjs");
const User = require("../user/userModel");

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
exports.decryptPassword = async (req, res, next) => {
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
