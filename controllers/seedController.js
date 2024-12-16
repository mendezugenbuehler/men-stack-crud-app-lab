const Movie = require('../models/movie');
const movies = require('../data/movies'); 

// Function to seed the database
const seedMovies = async (req, res) => {
  try {
    await Movie.insertMany(movies);
    res.status(201).send('Movies seeded successfully!');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error seeding movies');
  }
};

module.exports = {
  seedMovies,
};
