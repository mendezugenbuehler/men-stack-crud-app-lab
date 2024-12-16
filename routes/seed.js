const express = require('express');
const router = express.Router();
const seedController = require('../controllers/seedController');

// Route for seeding the database
router.post('/seed', seedController.seedMovies);

module.exports = router;
