require("./db/connection");
const express = require("express");
const cors = require("cors");
const userRouter = require("./user/userRoutes");
const filmRouter = require("./films/filmRoutes");
const app = express();
const port = process.env.PORT || 5001;

//Make sure that the app.use methods for express and cors are above any routers
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(filmRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
