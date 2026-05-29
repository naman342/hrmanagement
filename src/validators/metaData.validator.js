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

const countryNameSchema = Joi.object({
    name: Joi.string()
    .required()
    .messages({
        'any.required': 'name is required',
        'string.empty': 'Name is required'
    }),

    countryCode: Joi.string()
        .required()
        .messages({
            'string.empty': 'Country Code is required'
        }),
    
}); 

module.exports = {
    jobTitleSchema,
    countryNameSchema
};