const { Router } = require("express");
const {
  addUser,
  findUser,
  updateUser,
  deleteUser,
  login,
} = require("./userControllers");
const { hashPass, checkToken, decryptPass } = require("../middleware");
const userRouter = Router();

//User creation & manipulation - e.g. admin routes
userRouter.post("/user", hashPass, addUser);
userRouter.get("/user", findUser);
userRouter.patch("/user", updateUser);
userRouter.delete("/user/:filterKey/:filterVal", deleteUser);

//User login routes
userRouter.post("/login", decryptPass, login);
userRouter.get("/login", checkToken, login);

module.exports = userRouter;
