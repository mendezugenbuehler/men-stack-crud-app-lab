const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  isRecommended: Boolean,
});

const Movie = mongoose.model("Movie", movieSchema); 
module.exports = Movie;