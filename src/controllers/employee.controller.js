const {
    employeeSchema
} = require('../validators/employee.validator');

const {
    createEmployeeService,
    getEmployeesService
} = require('../services/employee.service');

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

        const employee = await createEmployeeService(req.body);

        res.status(201).json(employee);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: 'Internal server error'
        });

    }

}

async function  getEmployees(req, res) {

    const employees =
            await getEmployeesService();

    return res.status(200).json(employees);
};

module.exports = {
    createEmployee,
    getEmployees
};