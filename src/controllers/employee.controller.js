const {
    employeeSchema
} = require('../validators/employee.validator');

async function createEmployee(req, res) {

    try {

        const { error } =
            employeeSchema.validate(req.body);

        if (error) {
            let message =
                error.details[0].message;

            return res.status(400).json({
                message
            });

        }

        const employee = {
            id: Date.now(),
            ...req.body
        };

        res.status(201).json(employee);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: 'Internal server error'
        });

    }

}

module.exports = {
    createEmployee
};