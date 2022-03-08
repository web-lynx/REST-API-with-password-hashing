const { Router } = require("express");
const {
  addUser,
  findUser,
  updateUser,
  deleteUser,
  checkPass,
} = require("./userControllers");
const { hashPass } = require("../middleware");
const userRouter = Router();

//User creation & manipulation - e.g. admin routes
userRouter.post("/user", hashPass, addUser);
userRouter.get("/user", findUser);
userRouter.put("/user", updateUser);
userRouter.delete("/user", deleteUser);

//User login routes
userRouter.get("/login", checkPass);

module.exports = userRouter;
