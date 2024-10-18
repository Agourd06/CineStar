const Joi = require('joi');

const createSessionSchema = Joi.object({
    displayTime: Joi.date().required().messages({
        'date.base': 'Invalid date format',
        'any.required': 'Session date is required',
    }),
    price: Joi.number().positive().required().messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be a positive number',
        'any.required': 'Price is required'
    }),
    movie: Joi.string().required().messages({
        'string.empty': 'Movie ID is required',
        'any.required': 'Movie ID is required'
    }),
    room: Joi.string().required().messages({
        'string.empty': 'Room ID is required',
        'any.required': 'Room ID is required'
    })
});
const updateSessionSchema = Joi.object({
 
    displayTime: Joi.date().required().messages({
        'date.base': 'Invalid date format',
        'any.required': 'Session date is required',
    }),
    price: Joi.number().positive().required().messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be a positive number',
        'any.required': 'Price is required'
    }),
    movie: Joi.string().required().messages({
        'string.empty': 'Movie ID is required',
        'any.required': 'Movie ID is required'
    }),
    room: Joi.string().required().messages({
        'string.empty': 'Room ID is required',
        'any.required': 'Room ID is required'
    })
});

module.exports = {
    createSessionSchema , updateSessionSchema
}