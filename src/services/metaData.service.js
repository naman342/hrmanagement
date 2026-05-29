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

module.exports = {
    createJobTilleService
};