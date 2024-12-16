const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getAllMovies);  
router.get('/new', movieController.showNewMovieForm);  
router.post('/', movieController.createMovie);        
router.get('/:movieId', movieController.getMovieById); 
router.get('/:movieId/edit', movieController.showEditMovieForm);  
router.put('/:movieId', movieController.updateMovie);  
router.delete('/:movieId', movieController.deleteMovie); 

module.exports = router;
