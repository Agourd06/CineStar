const Joi = require('joi')



const createMovieSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.empty': "Movie name is required",
        'string.min': 'Movie name must be at least 3 characters long'
    }),
    trailer: Joi.string().required().messages({
        'string.empty': "Trailer URL is required",
        'string.uri': "Trailer must be a valid URL"
    }),
    duration: Joi.number().min(30).positive().required().messages({
        'number.base': 'Duration must be a number',
        'number.empty': 'Must add the duration of the movie',
        'number.min': 'Duration must be at least 30 minutes',
        'number.positive': 'Duration must be a positive number'
    }),
        image: Joi.any().required().messages({
            'any.required': 'Media is required',
        }),
        
        video: Joi.any().required().messages({
            'any.required': 'Video is required',
        }),
    description: Joi.string().required().messages({
        'string.empty': "Description is required"
    })
});


const updateMovieSchema = Joi.object({
    name: Joi.string().min(3).optional().messages({
        'string.min': 'Name must be at least 3 characters long',
    }),
    trailer: Joi.string().optional().messages({
        'string.uri': "Trailer must be a valid URL"
    }),
    duration: Joi.number().min(30).optional().positive().messages({
        'number.base': 'Duration must be a number',
        'number.min': 'Duration must be at least 30 minutes',
        'number.positive': 'Duration must be a positive number'
    }),
        image: Joi.any().optional().messages({
        }),
        
        video: Joi.any().optional().messages({
        }),
    description: Joi.string().optional().messages({
    })
});

module.exports = {
    createMovieSchema , updateMovieSchema
}

