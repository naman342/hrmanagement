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
            created_at,
            active
        FROM employees
        LIMIT 10
        `
    );

    return employees;
}

async function updateEmployeeService(id, salary) {

    await pool.execute(
        `UPDATE employees SET salary = ? WHERE id = ?`,
        [salary, id]
    );

    const [rows] = await pool.execute(
        `SELECT id, fullName, jobTitle, country, salary FROM employees WHERE id = ?`,
        [id]
    );

    return rows[0];
}

async function deleteEmployeeService(id) {
     await pool.execute(
        `
        UPDATE employees
        SET active = false
        WHERE id = ?
        `,
        [id]
    );

    const [rows] = await pool.execute(
        `
        SELECT id, fullName, jobTitle, country, salary, active
        FROM employees
        WHERE id = ?
        `,
        [id]
    );

    return rows[0];
}

module.exports = {
    createEmployeeService,
    getEmployeesService,
    updateEmployeeService,
    deleteEmployeeService
};