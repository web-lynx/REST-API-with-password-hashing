require("./db/connection");
const express = require("express");
const userRouter = require("./user/userRoutes");
const filmRouter = require("./films/filmRoutes");
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());

app.use(userRouter);
app.use(filmRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
