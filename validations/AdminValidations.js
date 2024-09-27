const Joi = require('joi');

const createAdminSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters long'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Valid email is required',
        'string.empty': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.empty': 'Password is required'
    })
});


const updateAdminSchema = Joi.object({
    name: Joi.string().min(3).optional().messages({
        'string.min': 'Name must be at least 3 characters long',
    }),
    email: Joi.string().email().optional().messages({
        'string.email': 'Valid email is required',
    }),
    password: Joi.string().min(6).optional().messages({
        'string.min': 'Password must be at least 6 characters long',
    })
});

module.exports = {
    createAdminSchema,updateAdminSchema
};
