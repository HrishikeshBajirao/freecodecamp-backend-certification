import express from 'express'
import {authenticate} from '../middleware/authenticate.js'
import {authorizeModification} from '../middleware/authorize.js'
import { getWatchlist, addMovie, updateMovie, deleteMovie } from '../utils/db.js'

const router = express.Router()

router.get('/:userId', authenticate, (req, res) => {
    const userId = Number(req.params.userId);
    const watchlist = getWatchlist(userId);
    res.status(200).json(watchlist);
})

router.post('/:userId/movies', authenticate, authorizeModification, (req, res) => {
    const userId = Number(req.params.userId);
    const movie = req.body;

    addMovie(userId, movie)
    res.status(201).json({message: "Movie added successfully"})
})

router.put('/:userId/movies/:movieId', authenticate, authorizeModification, (req, res) => {
    const userId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);
    const movie = req.body

    updateMovie(userId, movieId, movie)
    res.status(200).json({message: "Movie updated successfully"})
})

router.delete('/:userId/movies/:movieId', authenticate, authorizeModification, (req, res) => {
    const userId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);

    deleteMovie(userId, movieId)
    res.status(200).json({message: "Movie deleted successfully"})
})

export default router