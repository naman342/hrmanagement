const Joi = require('joi');

const employeeSchema = Joi.object({
    fullName: Joi.string()
    .required()
    .messages({
        'any.required': 'Full name is required',
        'string.empty': 'Full name is required'
    }),

    jobTitle: Joi.number()
        .positive()
        .required()
        .messages({
            'any.required': 'Job title is required'
        }),

    country: Joi.number()
        .positive()
        .required()
        .messages({
            'any.required': 'Country is required'
        }),

    salary: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': 'Salary must be a number',
            'number.positive': 'Salary must be positive',
            'any.required': 'Salary is required'
        })
});

module.exports = {
    employeeSchema
};