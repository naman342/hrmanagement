/**
 * Seed the database with employee records (default: 10,000).
 *
 * Usage:
 *   node scripts/seedEmployees.js
 *   COUNT=5000 node scripts/seedEmployees.js
 *   CLEAR_EMPLOYEES=1 node scripts/seedEmployees.js   # delete all employees first
 *
 * Requires .env with DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const { pool } = require('../src/config/mysql.connection');

const TOTAL = Number(process.env.COUNT) || 10000;
const BATCH_SIZE = Number(process.env.BATCH_SIZE) || 500;
const CLEAR_FIRST = process.env.CLEAR_EMPLOYEES === '1';

async function ensureReferenceData() {
  const [jobCount] = await pool.execute('SELECT COUNT(*) AS c FROM job_titles');
  if (jobCount[0].c === 0) {
    await pool.execute(
      `INSERT INTO job_titles (title, code) VALUES
       ('Software Engineer', 'SDE'),
       ('Senior Software Engineer', 'SSE'),
       ('QA Engineer', 'QA'),
       ('Product Manager', 'PM'),
       ('Human Resource', 'HR')`
    );
    console.log('Inserted default job titles.');
  }

  const [countryCount] = await pool.execute('SELECT COUNT(*) AS c FROM countries');
  if (countryCount[0].c === 0) {
    await pool.execute(
      `INSERT INTO countries (name, countryCode) VALUES
       ('India', 'IN'),
       ('United States of America', 'USA'),
       ('United Kingdom', 'UK')`
    );
    console.log('Inserted default countries.');
  }

  const [jobRows] = await pool.execute('SELECT id FROM job_titles');
  const [countryRows] = await pool.execute('SELECT id FROM countries');

  if (jobRows.length === 0 || countryRows.length === 0) {
    throw new Error('job_titles and countries must exist before seeding employees.');
  }

  return {
    jobIds: jobRows.map((r) => r.id),
    countryIds: countryRows.map((r) => r.id),
  };
}

async function seedEmployees() {
  const start = Date.now();
  const { jobIds, countryIds } = await ensureReferenceData();

  if (CLEAR_FIRST) {
    const [result] = await pool.execute('DELETE FROM employees');
    console.log(`Cleared employees table (${result.affectedRows} rows removed).`);
  }

  const [existing] = await pool.execute('SELECT COUNT(*) AS c FROM employees');
  console.log(`Existing employees: ${existing[0].c}`);
  console.log(`Inserting ${TOTAL} employees in batches of ${BATCH_SIZE}…`);

  let inserted = 0;

  for (let offset = 0; offset < TOTAL; offset += BATCH_SIZE) {
    const batchCount = Math.min(BATCH_SIZE, TOTAL - offset);
    const placeholders = [];
    const values = [];

    for (let i = 0; i < batchCount; i++) {
      const n = offset + i + 1;
      placeholders.push('(?, ?, ?, ?)');
      values.push(
        `Employee ${n}`,
        jobIds[(n*11) % jobIds.length],
        countryIds[(n*19) % countryIds.length],
        30000 + (n % 970000)
      );
    }

    await pool.execute(
      `INSERT INTO employees (fullName, jobTitle, country, salary) VALUES ${placeholders.join(', ')}`,
      values
    );

    inserted += batchCount;
    if (inserted % 2000 === 0 || inserted === TOTAL) {
      console.log(`  ${inserted} / ${TOTAL}`);
    }
  }

  const [final] = await pool.execute('SELECT COUNT(*) AS c FROM employees WHERE active = 1');
  const seconds = ((Date.now() - start) / 1000).toFixed(1);

  console.log(`Done. Inserted ${inserted} employees in ${seconds}s.`);
  console.log(`Active employees in DB: ${final[0].c}`);
}

seedEmployees()
  .catch((err) => {
    console.error('Seed failed:', err.message);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
