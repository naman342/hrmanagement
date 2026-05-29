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

module.exports = {
    createJobTilleService,
    createCountryNameService
};