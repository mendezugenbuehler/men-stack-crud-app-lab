const Movie = require('../models/movie');

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.render('movies/index', { movies: allMovies });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching movies');
  }
};

const showNewMovieForm = (req, res) => {
  res.render('movies/new');
};

const createMovie = async (req, res) => {
  try {
    await Movie.create(req.body);
    res.redirect('/movies');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating movie');
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    res.render('movies/show', { movie });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching movie details');
  }
};

const showEditMovieForm = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    res.render('movies/edit', { movie });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading edit movie form');
  }
};

const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.movieId, req.body, { new: true });
    res.redirect(`/movies/${updatedMovie._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating movie');
  }
};

const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.movieId);
    res.redirect('/movies');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting movie');
  }
};

module.exports = {
  getAllMovies,
  showNewMovieForm,
  createMovie,
  getMovieById,
  showEditMovieForm,
  updateMovie,
  deleteMovie,
};
