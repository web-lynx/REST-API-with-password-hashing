const { Router } = require("express");
const { addFilm, listFilms, testRoute } = require("./filmControllers");

//These are the HTTP verbs - POST, GET, etc

filmRouter.post("/film", addFilm);
filmRouter.get("/film", listFilms);

//Test Route
filmRouter.get("/test", testRoute);

module.exports = filmRouter;
