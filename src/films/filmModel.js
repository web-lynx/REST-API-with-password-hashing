const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    actors: [{ type: String }],
    director: {
        type: String,
    },
    year: {
        type: Number,
    },
    rating: {
        type: Number,
    },
    synopsis: {
        type: String,
    },
});

const Film = mongoose.model("Film", filmSchema);
module.exports = Film;
