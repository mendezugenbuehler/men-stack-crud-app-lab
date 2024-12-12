const dotenv = require("dotenv"); 
dotenv.config(); 
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override"); 
const morgan = require("morgan");


const app = express();
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

const Movie = require("./models/movie.js");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

  // GET /movies
  app.get("/movies", async (req, res) => {
    const allMovies = await Movie.find();
    res.render("movies/index.ejs", { movies: allMovies });
  });

// GET /movies/new
app.get("/movies/new", (req, res) => {
    res.render("movies/new.ejs");
  });

  app.get("/movies/:movieId", async (req, res) => {
    const foundMovie = await Movie.findById(req.params.movieId);
    res.render("movies/show.ejs", { movie: foundMovie });
  });

// POST /movies
app.post("/movies", async (req, res) => {
    if (req.body.isRecommended === "on") {
      req.body.isRecommended = true;
    } else {
      req.body.isRecommended = false;
    }
    await Movie.create(req.body);
    res.redirect("/movies"); 
  });

  app.delete("/movies/:movieId", async (req, res) => {
    await Movie.findByIdAndDelete(req.params.movieId);
    res.redirect("/movies");
  });

  app.get("/movies/:movieId/edit", async (req, res) => {
    const foundMovie = await Movie.findById(req.params.movieId);
    res.render("movies/edit.ejs", {
      movie: foundMovie,
    });
  });

  app.put("/movies/:movieId", async (req, res) => {
    // Handle the 'isReadyToEat' checkbox data
    if (req.body.isRecommended === "on") {
      req.body.isRecommended = true;
    } else {
      req.body.isRecommended = false;
    }
    
    // Update the fruit in the database
    await Movie.findByIdAndUpdate(req.params.movieId, req.body);
  
    // Redirect to the fruit's show page to see the updates
    res.redirect(`/movies/${req.params.movieId}`);
  });

app.listen(3001, () => {
  console.log('Listening on port 3001');
});