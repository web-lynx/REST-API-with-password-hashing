const Film = require("./filmModel");

//Adds a film to the DB
exports.addFilm = async (req, res) => {
    try {
        let newFilm = await Film.create(req.body);
        res.status(200).send({ film: newFilm });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};

//!Lists all films in the DB - deprecated - see below
// exports.listFilms = async (req, res) => {
//     try {
//         let films = await Film.find({});
//         res.status(200).send({ films });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ error: error.message });
//     }
// };

//Finds matching films by the body of the request - if the object is empty, simply finds all
exports.findFilm = async (req, res) => {
    try {
        let foundFilm = await Film.find(req.body);
        res.status(200).send(foundFilm);
    } catch (error) {
        console.log(error);
        res.status(404).send({ error: "Cannot find the specified film." });
    }
};

//Finds matching film by title, and then updates per user input
exports.updateFilm = async (req, res) => {
    try {
        if (req.body.newtitle) {
            let updatedFilm = await Film.findOneAndUpdate(
                { title: title },
                { title: newtitle },
                { new: true }
            );
            res.status(200).send(
                `Film "${updatedFilm.title}" has been updated with new title.`
            );
        } else if (req.body.newactor) {
            let updatedFilm = await Film.findOneAndUpdate(
                { title: title },
                { actor: newactor },
                { new: true }
            );
            res.status(200).send(
                `Film "${updatedFilm.title}" has been updated with new actor "${req.body.newactor}".`
            );
        } else if (req.body.newdirector) {
            let updatedFilm = await Film.findOneAndUpdate(
                { title: title },
                { director: newdirector },
                { new: true }
            );
            res.status(200).send(
                `Film "${updatedFilm.title}" has been updated with new director "${updatedFilm.director}"`
            );
        } else if (req.body.newyear) {
            let updatedFilm = await Film.findOneAndUpdate(
                { title: title },
                { year: newyear },
                { new: true }
            );
            res.status(200).send(
                `Film "${updatedFilm.title}" has been updated with new year of release "${updatedFilm.year}"`
            );
        } else if (req.body.newrating) {
            let updatedFilm = await Film.findOneAndUpdate(
                { title: title },
                { rating: newrating },
                { new: true }
            );
            res.status(200).send(
                `Film "${updatedFilm.title}" has been updated with new rating "${updatedFilm.rating}"`
            );
        } else if (req.body.newsynopsis) {
            let updatedFilm = await Film.findOneAndUpdate(
                { title: title },
                { synopsis: newsynopsis },
                { new: true }
            );
            res.status(200).send(
                `Film "${updatedFilm.title}" has been updated with new synopsis "${updatedFilm.synopsis}"`
            );
        } else {
            res.status(404).send("Sorry, couldn't find the film to update.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};

//Finds matching film by title, and then deletes it
exports.deleteFilm = async (req, res) => {
    try {
        let deletedFilm = await Film.findOneAndDelete({
            title: req.body.title,
        });
        res.status(200).send(`Film "${deletedFilm.title}" has been deleted.`);
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
