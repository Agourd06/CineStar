const movieService = require('../service/MovieService')

const {
    createMovieSchema,
    updateMovieSchema
} = require('../validations/MovieValidations')

const createMovie = async (req, res) => {
    try {
        
       
        
        const { error } = createMovieSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }
 
        if (!req.files || !req.files.image || !req.files.video) {
            return res.status(400).json({
                message: 'Movie media and video are required'
            });
        }
      

        const movie = await movieService.createMovie(req.body, req.files);

        return res.status(201).json({
            message: "Movie created successfully",
            movie: movie
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Failed to create movie',
            error: error.message
        });
    }
};

const getAllMovies = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;

        const movies = await movieService.getAllMovies(Number(page), Number(limit))

        res.status(200).json({
            success: true,
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


const getMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await movieService.getMovie(id);

        res.status(200).json({
            success: true,
            data: movie
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const updateMovie = async (req, res) => {
    try {
        const {
            id
        } = req.params

        const {
            error
        } = updateMovieSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const updatedMovie = await movieService.updateMovie(id, req.body);
        if (!updatedMovie) {
            return res.status(404).send("Movie not found")
        }
        res.status(200).json({
            message: "Movie updated successfully",
            movie: updatedMovie
        })
    } catch (error) {
        console.error("error updating movie", error)
      
        res.status(500).json({
            message: "Failed to update movie",
            error: error.message
        })
    }
}
const deleteMovie = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const deletedMovie = await movieService.deleteMovie(id);
        if (!deletedMovie) {
            return res.status(404).send("Movie not found")
        }
        res.status(200).json({
            message: "Movie deleted successfully",
            movie: deletedMovie
        })
    } catch (error) {
        console.error("error deleting movie", error)

        res.status(500).json({
            message: "Failed to delete movie",
            error: error.message
        })
    }
}
module.exports = {
    createMovie,
    getAllMovies,
    getMovie,
    updateMovie,
    deleteMovie
}