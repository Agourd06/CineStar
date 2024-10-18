const Movie = require('../model/MovieModel');
const minioClient = require('../config/minioClient');
const sharp = require('sharp');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET;


const createMovie = async (movieData, files) => {
    try {

        if (!files.image || !files.video) {
            throw new Error("Media and video files are required");
        }

        // const mediaUrl = await uploadMoviePoster(files.media[0], 'medias');
        // const videoUrl = await uploadMoviePoster(files.video[0], 'videos');

        const movie = new Movie(movieData);
        return await movie.save();
    } catch (error) {
        throw new Error('Movie is not added: ' + error.message);
    }
};



 const uploadMoviePoster = async (req, res, next) => {
    const timestamp = Date.now();
    const randomId = Math.round(Math.random() * 1E9);
    const bucketName = 'cinestarmovies';

    if (req.files?.image) {
        const imageFile = req.files.image[0];
        const imageFileName = `movies/images/${req.body.trailer}-${timestamp}-${randomId}.png`;

        const imageBuffer = await sharp(imageFile.buffer).toBuffer();
        await minioClient.putObject(bucketName, imageFileName, imageBuffer);
        req.body.image = `/${bucketName}/${imageFileName}`;
    }

    if (req.files?.video) {
        const videoFile = req.files.video[0];
        const videoFileName = `movies/videos/${req.body.trailer}-${timestamp}-${randomId}.mp4`;

        await minioClient.putObject(bucketName, videoFileName, videoFile.buffer);
        req.body.video = `/${bucketName}/${videoFileName}`;
    }

    next();
};






const getAllMovies = async (page = 1, limit = 5) => {
    try {
        const skip = (page - 1) * limit;

        const movies = await Movie.find({
                deleted_at: null
            })
            .skip(skip)
            .sort({
                createdAt: -1
            })
            .limit(limit);

        return movies;
    } catch (error) {
        throw new Error('Error fetching movies: ' + error.message);
    }
}
const getMovies = async () => {
    try {

        const movies = await Movie.find({
                deleted_at: null
            })

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

        const videoToken = jwt.sign({
                videoUrl: movie.videoUrl
            },
            secretKey, {
                expiresIn: '1h'
            }
        );

        return {
            ...movie.toObject(),
            videoToken
        };
    } catch (error) {
        throw new Error('Error fetching Movie: ' + error.message);
    }
}






const updateMovie = async (movieId, movieData) => {
    try {
        console.log(movieData);
        
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
    uploadMoviePoster,
    getAllMovies,
    getMovie,
    updateMovie,
    deleteMovie,
    getMovies
}