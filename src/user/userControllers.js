const User = require("./userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Adds a user to the DB - now with JWT tokens created during the process
exports.addUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET);
    res.status(200).send({ user: newUser.username, token });
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
      [req.params.filterKey]: req.params.filterVal,
    });
    if (deletedUser.deletedCount > 0) {
      res.status(200).send(`User ${deletedUser.username} deleted.`);
    } else {
      throw new Error("Did not remove user");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await jwt.sign({ _id: req.user.id });
    res.status(200).send({ user: req.user.username, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

//// Deprecated - "all in one func"
// //Login function that compares bcrypt hashed pw with actual pw
// exports.checkPass = async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (user) {
//       const validPassword = await bcrypt.compare(
//         req.body.password,
//         user.password
//       );
//       if (validPassword) {
//         res.status(200).send({ message: "Valid password" });
//       } else {
//         res.status(400).send({ error: "Invalid password." });
//       }
//     } else {
//       res.status(400).send({ error: "User not found." });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ error: error.message });
//   }
// };
