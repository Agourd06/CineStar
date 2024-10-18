const Joi = require('joi');

const commentSchema = Joi.object({
  
    content: Joi.string().required().messages({
        'any.required': 'comment is required',
    }),
    client: Joi.string().required().messages({
        'any.required': 'client is required',
    }),
    movie: Joi.string().required().messages({
        'any.required': 'movie is required',
    })
});
module.exports = {
    commentSchema
}
