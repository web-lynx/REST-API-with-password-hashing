const Film = require("./filmModel");

//Adds a film to the DB
exports.addFilm = async (req, res) => {
    try {
        const newFilm = await Film.create(req.body);
        res.status(200).send({ film: newFilm });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};

//Lists all films in the DB
exports.listFilms = async (req, res) => {
    try {
        const films = await Film.find({});
        res.status(200).send({ films });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};

//Finds one film by its' title
exports.findFilm = async (req, res) => {
    try {
        const film = await Film.findOne({ title: req.title });
        res.status(200).send({ film });
    } catch (error) {
        console.log(error);
        res.status(404).send({ error: "Cannot find the specified film." });
    }
};

exports.updateFilm = async (req, res) => {
    try {
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};

exports.deleteFilm = async (req, res) => {
    try {
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};

//Tester function
exports.testRoute = async (req, res) => {
    try {
        res.status(200).send({ test: "Route is working" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};
