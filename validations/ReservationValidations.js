const Joi = require('joi');

const createReservationSchema = Joi.object({
    seat: Joi.array().items(Joi.number().integer().positive()).min(1).required().messages({
        'array.base': 'Seats must be an array of numbers',
        'array.empty': 'At least one seat must be selected',
        'array.min': 'At least one seat must be selected',
        'number.base': 'Each seat must be a valid number',
        'number.integer': 'Each seat must be a whole number',
        'number.positive': 'Each seat number must be a positive integer'
    }),
    session: Joi.number().integer().positive().required().messages({
        'number.base': 'Session must be a valid number',
        'number.empty': 'Session is required',
        'number.integer': 'Session must be a whole number',
        'number.positive': 'Session must be a positive integer'
    })
});
const updateReservationSchema = Joi.object({
    seat: Joi.array().items(Joi.number().integer().positive()).optional().messages({
        'array.base': 'Seats must be an array of numbers',
        'array.empty': 'At least one seat must be selected',
        'number.base': 'Each seat must be a valid number',
        'number.integer': 'Each seat must be a whole number',
        'number.positive': 'Each seat number must be a positive integer'
    }),
    session: Joi.number().integer().positive().optional().messages({
        'number.base': 'Session must be a valid number',
        'number.empty': 'Session is required',
        'number.integer': 'Session must be a whole number',
        'number.positive': 'Session must be a positive integer'
    })
});

module.exports= {
    createReservationSchema , updateReservationSchema
}