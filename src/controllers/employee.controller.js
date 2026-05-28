const {
    employeeSchema
} = require('../validators/employee.validator');

const {
    createEmployeeService,
    getEmployeesService,
    updateEmployeeService,
    deleteEmployeeService,
    getMaxSalaryService,
    getMinSalaryService
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

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    
    const employees =
            await getEmployeesService(page, limit);

    return res.status(200).json(employees);
};

async function updateEmployee(req, res) {

    try {
        const { id } = req.params;
        const { salary } = req.body;
        const updatedEmployee =
            await updateEmployeeService(
                id,
                salary
            );

        return res.status(200).json({
                ...updatedEmployee,
                salary: Number(updatedEmployee.salary)
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: 'Internal server error'
        });

    }

}

async function deleteEmployee(req, res) {

    try {

        const { id } = req.params;

        const employee =
            await deleteEmployeeService(id);

        return res.status(200).json(employee);

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            message: 'Internal server error'
        });

    }

}

async function maxSalary(req, res) {
    const { country, jobTitle } = req.query;

    const result =
        await getMaxSalaryService({
            country,
            jobTitle
        });

    return res.status(200).json(result);
}

async function minSalary(req, res) {
    const { country, jobTitle } = req.query;
    const result =
    await getMinSalaryService({
        country,
        jobTitle
    });
    return res.status(200).json(result);
}

module.exports = {
    createEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
    maxSalary,
    minSalary
};