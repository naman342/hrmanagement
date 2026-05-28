const {pool} = require('../config/mysql.connection');
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

        const {
            fullName,
            jobTitle,
            country,
            salary
        } = req.body;

        const employee = await pool.execute(
            `
            INSERT INTO employees
            (full_name, job_title, country, salary)
            VALUES (?, ?, ?, ?)
            `,
            [fullName, jobTitle, country, salary]
        );
        

        res.status(201).json(employee);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: 'Internal server error'
        });

    }

}

async function  getEmployees(req, res) {

    const [employees] = await pool.execute(
    `
    SELECT
        id,
        full_name,
        job_title,
        country,
        salary,
        created_at
    FROM employees
    LIMIT 10
    `
);

console.log(employees ,"naman")
    return res.status(200).json(employees);
};

module.exports = {
    createEmployee,
    getEmployees
};