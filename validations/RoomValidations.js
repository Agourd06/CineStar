const Joi = require('joi');

const createRoomSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.empty': "Room Name is required",
        'any.required': "Room Name is required"
    }),
    capacity: Joi.number().integer().min(6).required().messages({
        'number.base': 'Room capacity must be a number',
        'number.empty': 'Room capacity is required',
        'number.min': "Room capacity can't be below 6 seats",
        'any.required': "Room capacity is required"
    }),
    room_type: Joi.string().valid('VIP', 'Classic').required().messages({
        'any.only': 'Room type must be either VIP or Normal',
        'any.required': "Room type is required"
    }),
});


const updateRoomSchema = Joi.object({
    name: Joi.string().min(3).optional().messages({
        'string.base': 'Room name must be a string',
        'string.min': 'Room name must be at least 3 characters long',
    }),
    capacity: Joi.number().integer().min(6).optional().messages({
        'number.base': 'Capacity must be a number',
        'number.min': 'Capacity must be at least 1',
    }),
    room_type: Joi.string().valid('VIP', 'Classic').optional().messages({
        'any.only': 'Room type must be either VIP or Normal',
    }),
});
module.exports = {
    createRoomSchema,
    updateRoomSchema

}
