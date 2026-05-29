const Joi = require('joi');

const jobTitleSchema = Joi.object({
    title: Joi.string()
    .required()
    .messages({
        'any.required': 'title is required',
        'string.empty': 'Title is required'
    }),

    code: Joi.string()
        .required()
        .messages({
            'string.empty': 'Job Code is required'
        }),
    
});

module.exports = {
    jobTitleSchema
};