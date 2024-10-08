const Movie = require('../model/MovieModel');


const createMovie = async (movieData) => {
    try {
        const movie = new Movie(movieData)
        return await movie.save();

    } catch (error) {
        throw new Error('movie is not added : ' + error.message)
    }

}





const getAllMovies = async () => {
    try {
        const movies = await Movie.find({
            deleted_at: null
        });

        return movies;
    } catch (error) {
        throw new Error('Error fetching movies: ' + error.message);
    }
}

const getMovie = async (movieId) => {


    try {
        const movie = await Movie.findOne({
            _id: movieId,
            deleted_at: null
        });
        return movie;
    } catch (error) {
        throw new Error('Error fetching Movie: ' + error.message);
    }
}





const updateMovie = async (movieId, movieData) => {
    try {
        const updatedMovie = await Movie.findOneAndUpdate({
                _id: movieId
            },
            movieData, {
                new: true
            });
        return updatedMovie
    } catch (error) {
        throw new Error('Error updating movie: ' + error.message);
    }
}






const deleteMovie = async (movieId) => {
    try {
        const deletedMovie = await Movie.findOneAndUpdate({
            _id: movieId
        }, {
            deleted_at: new Date()
        }, {
            new: true
        });

        if (!deletedMovie) {
            throw new Error('Movie not found');
        }

        return deletedMovie;
    } catch (error) {
        throw new Error('Error deleting movie: ' + error.message);
    }
}


module.exports = {
    createMovie,
    getAllMovies,
    getMovie,
    updateMovie,
    deleteMovie
}