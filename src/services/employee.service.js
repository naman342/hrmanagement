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

async function getMaxSalaryService(filters = {}) {

    let query = `
        SELECT MAX(salary) AS maxSalary
        FROM employees
        WHERE 1=1
    `;

    const values = [];

    // optional filter: country
    if (filters.country) {
        query += ` AND country = ?`;
        values.push(filters.country);
    }

    // optional filter: jobTitle
    if (filters.jobTitle) {
        query += ` AND jobTitle = ?`;
        values.push(filters.jobTitle);
    }
    console.log(values ,"values")
    console.log(query ,"query")

    const [rows] = await pool.execute(query, values);
    console.log(rows ,"rows")
    return {
        maxSalary: Number(rows[0]?.maxSalary ?? 0)
    };
}
async function getMinSalaryService(filters = {}) {

    let query = `
        SELECT MIN(salary) AS minSalary
        FROM employees
        WHERE 1=1
    `;

    const values = [];

    // optional filter: country
    if (filters.country) {
        query += ` AND country = ?`;
        values.push(filters.country);
    }

    // optional filter: jobTitle
    if (filters.jobTitle) {
        query += ` AND jobTitle = ?`;
        values.push(filters.jobTitle);
    }
    console.log(values ,"values")
    console.log(query ,"query")

    const [rows] = await pool.execute(query, values);
    console.log(rows ,"rows")
    return {
        minSalary: Number(rows[0]?.minSalary ?? 0)
    };
}

module.exports = {
    createEmployeeService,
    getEmployeesService,
    updateEmployeeService,
    deleteEmployeeService,
    getMaxSalaryService,
    getMinSalaryService
};