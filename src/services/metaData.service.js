const { pool } =
    require('../config/mysql.connection');

async function createJobTilleService(data) {

    const {
        title,
        code
    } = data;
    const [result] = await pool.execute(
    "INSERT INTO job_titles (title, code) VALUES (?, ?)",
    [title, code]
  );

  return {
    id: result.insertId,
    title,
    code,
  };
}

async function getJobTitlesService() {
  const [rows] = await pool.execute(
    "SELECT id, title, code FROM job_titles LIMIT 20"
  );

  return rows;
}

async function createCountryNameService(data) {
    const {
        name,
        countryCode
    } = data;
    const [result] = await pool.execute(
    "INSERT INTO countries (name, countryCode) VALUES (?, ?)",
    [name, countryCode]
  );

  return {
    id: result.insertId,
    name,
    countryCode,
  };
}

async function getCountryNameService() {
  const [rows] = await pool.execute(
    "SELECT id, name, countryCode FROM countries LIMIT 20"
  );

  return rows;
}
module.exports = {
    createJobTilleService,
    getJobTitlesService,
    createCountryNameService,
    getCountryNameService
};