const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./configs/database');
const movieRoutes = require('./routes/movie');
const seedRoutes = require('./routes/seed');

dotenv.config();

const app = express();

connectDB(process.env.MONGODB_URI);

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use('/movies', movieRoutes);
app.use('/', seedRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});