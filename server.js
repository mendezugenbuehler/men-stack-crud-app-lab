const dotenv = require("dotenv"); 
dotenv.config(); 
const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

const Movie = require("./models/movie.js");
app.use(express.urlencoded({ extended: false }));


// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

// GET /movies/new
app.get("/movies/new", (req, res) => {
    res.render("movies/new.ejs");
  });

// POST /movies
app.post("/movies", async (req, res) => {
    console.log(req.body);
    res.redirect("/movies/new");
  });

app.listen(3001, () => {
  console.log('Listening on port 3001');
});