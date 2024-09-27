const Joi = require('joi');

const createSessionSchema = Joi.object({
    date: Joi.date().required().messages({
        'date.base': 'Invalid date format',
        'any.required': 'Session date is required',
    }),
    price: Joi.number().positive().required().messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be a positive number',
        'any.required': 'Price is required'
    }),
    movieId: Joi.string().required().messages({
        'string.empty': 'Movie ID is required',
        'any.required': 'Movie ID is required'
    }),
    roomId: Joi.string().required().messages({
        'string.empty': 'Room ID is required',
        'any.required': 'Room ID is required'
    })
});
const updateSessionSchema = Joi.object({
 
    price: Joi.number().positive().optional().messages({
        'number.positive': 'Price must be a positive number',
    }),

});

module.exports = {
    createSessionSchema , updateSessionSchema
}