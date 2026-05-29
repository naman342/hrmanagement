/**
 * Seed the database with employee records (default: 10,000).
 *
 * Usage:
 *   node scripts/createTables.js
*
 * Requires .env with DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const { pool } = require('../src/config/mysql.connection');




async function createTables() {
   await pool.execute(
        `CREATE TABLE IF NOT EXISTS job_titles (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(100),
        code VARCHAR(20),
        PRIMARY KEY (id),
        UNIQUE KEY uq_job_titles_code (code))`
    );
    console.log('Job tiltes Table created')
    await pool.execute(`CREATE TABLE IF NOT EXISTS countries (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        countryCode VARCHAR(10) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY uq_countries_countryCode (countryCode)
    );`)
    console.log('country name Table created')

   
    await pool.execute(`CREATE TABLE IF NOT EXISTS employees (
        id INT NOT NULL AUTO_INCREMENT,
        fullName VARCHAR(100) NOT NULL,
        salary INT NOT NULL,
        active TINYINT(1) DEFAULT 1,
        jobTitle INT NOT NULL,
        country INT NOT NULL,

        PRIMARY KEY (id),

        KEY idx_employees_active_id (active, id),
        KEY idx_employees_jobTitle (jobTitle),
        KEY idx_employees_country (country),

        CONSTRAINT fk_employees_jobTitle
            FOREIGN KEY (jobTitle) REFERENCES job_titles(id)
            ON DELETE RESTRICT
            ON UPDATE CASCADE,

        CONSTRAINT fk_employees_country
            FOREIGN KEY (country) REFERENCES countries(id)
            ON DELETE RESTRICT
            ON UPDATE CASCADE
        );`)

        console.log('Employees Table created')
}

createTables()
  .catch((err) => {
    console.error('table creation failed:', err.message);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
