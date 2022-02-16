const { Router } = require("express");
const {
    addUser,
    findUser,
    updateUser,
    deleteUser,
} = require("./userControllers");
const { hashPass } = require("../middleware");
const userRouter = Router();

userRouter.post("/user", hashPass, addUser);
userRouter.get("/user", findUser);
userRouter.put("/user", updateUser);
userRouter.delete("/user", deleteUser);

module.exports = userRouter;
