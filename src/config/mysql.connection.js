const mysql = require('mysql2/promise');

const isTest =
    process.env.NODE_ENV === 'test';

const databaseName = isTest
    ? process.env.TEST_DB_NAME
    : process.env.DB_NAME;

    console.log(databaseName ,"databaseName")
    console.log(process.env.TEST_DB_NAME ,"process.env.TEST_DB_NAME+++")
    console.log(process.env.DB_NAME ,"++++process.env.DB_NAME")

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: databaseName,
    waitForConnections: true,
    connectionLimit: 10
});
console.log(process.env.DB_USER ,"USEERR")

async function testConnection() {
    const connection = await pool.getConnection();

    console.log('MySQL Connected');

    connection.release();
}

module.exports = {
    pool,
    testConnection
};
