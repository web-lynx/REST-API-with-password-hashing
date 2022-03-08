const User = require("./userModel");
const bcrypt = require("bcryptjs");

//Adds a user to the DB
exports.addUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).send({ user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

//Finds one user by their username
exports.findUser = async (req, res) => {
  try {
    const returnedUser = await User.find({ username: req.body.username });
    res.status(200).send({ returnedUser });
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "Cannot find the specified user." });
  }
};

//Finds one user by their username, then updates
exports.updateUser = async (req, res) => {
  try {
    if (req.body.newpassword) {
      let updatedUser = await User.findOneAndUpdate(
        { username: req.body.username },
        { password: req.body.newpassword },
        { new: true }
      );
      res.status(200).send({
        message: `User ${updatedUser.username} updated with new password.`,
      });
    } else if (req.body.newemail) {
      let updatedUser = await User.findOneAndUpdate(
        { username: req.body.username },
        { email: req.body.newemail },
        { new: true }
      );
      res.status(200).send({
        message: `User ${updatedUser.username} updated with new email address.`,
      });
    } else if (req.body.newusername) {
      let updatedUser = await User.findOneAndUpdate(
        { username: req.body.username },
        { username: req.body.newusername },
        { new: true }
      );
      res.status(200).send({
        message: `User ${updatedUser.username} updated with new username.`,
      });
    } else {
      res.status(404).send({
        error: "Cannot find the specified user to update.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      username: req.body.username,
    });
    res.status(200).send(`User ${deletedUser.username} deleted.`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

//Login function that compares bcrypt hashed pw with actual pw
exports.checkPass = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        res.status(200).send({ message: "Valid password" });
      } else {
        res.status(400).send({ error: "Invalid password." });
      }
    } else {
      res.status(400).send({ error: "User not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
