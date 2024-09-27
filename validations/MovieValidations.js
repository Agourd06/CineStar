const Joi = require('joi')

const createMovieSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.empty': "Movie name is required",
        'string.min': 'Movie name must be at least 3 characters long'
    }),
    duration: Joi.number().min(30).positive().required().messages({
        'number.base': 'Duration must be a number',
        'number.empty': 'Must add the duration of the movie',
        'number.min': 'Duration must be at least 30 minutes',
        'number.positive': 'Duration must be a positive number'

    }),
    media: Joi.string().required().messages({
        'string.empty': 'Must add a picture for the movie',
        'any.required': 'A media file is required' 
    })
});


const updateMovieSchema = Joi.object({
    name: Joi.string().min(3).optional().messages({
        'string.min': 'Name must be at least 3 characters long',
    }),
    duration: Joi.number().min(30).positive().optional().messages({
        'number.base': 'Duration must be a number',
        'number.min': 'Duration must be at least 30 minutes',
        'number.positive': 'Duration must be a positive number'
    }),
    media: Joi.string().optional().messages({
        'string.empty': 'Must provide a new picture for the movie if updating the media'
    })
});

module.exports = {
    createMovieSchema , updateMovieSchema
}

