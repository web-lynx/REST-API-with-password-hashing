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

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            validPassword = await bcrypt.compare(
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
