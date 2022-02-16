const Film = require("./filmModel");

exports.addFilm = async (req, res) => {
    try {
        const newFilm = await Film.create(req.body);
        res.status(200).send({ film: newFilm });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};

exports.listFilms = async (req, res) => {
    try {
        const films = await Film.find({});
        res.status(200).send({ films });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};

exports.findFilm = async (req, res) => {
    try {
        const film = await Film.find({});
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};

exports.updateFilm = async (req, res) => {
    try {
    } catch (error) {}
};

exports.deleteFilm = async (req, res) => {
    try {
    } catch (error) {}
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
