const { pool } =
    require('../config/mysql.connection');

async function createEmployeeService(data) {

    const {
        fullName,
        jobTitle,
        country,
        salary
    } = data;

    const [result] = await pool.execute(
        `
        INSERT INTO employees
        (fullName, jobTitle, country, salary)
        VALUES (?, ?, ?, ?)
        `,
        [fullName, jobTitle, country, salary]
    );

    return {
        id: result.insertId,
        ...data
    };
}

async function getEmployeesService() {

    const [employees] = await pool.execute(
        `
        SELECT
            id,
            fullName,
            jobTitle,
            country,
            salary,
            created_at
        FROM employees
        LIMIT 10
        `
    );

    return employees;
}

module.exports = {
    createEmployeeService,
    getEmployeesService
};