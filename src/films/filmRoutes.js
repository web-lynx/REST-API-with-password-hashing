const { Router } = require("express");
const {
    addFilm,
    listFilms,
    testRoute,
    updateFilm,
    deleteFilm,
} = require("./filmControllers");
const filmRouter = Router();

//These are the HTTP verbs - POST, GET, etc

filmRouter.post("/film", addFilm);
filmRouter.get("/film", listFilms);
filmRouter.put("/film", updateFilm);
filmRouter.delete("/film", deleteFilm);

//Test Route
filmRouter.get("/test", testRoute);

module.exports = filmRouter;
