const request = require('supertest');


const app = require('../../app')
const { pool } = require('../config/mysql.connection');

describe('MetaData API',()=>{
   
    beforeEach(async () => {
    await pool.execute("DELETE FROM job_titles");
    });

    afterAll(async () => {
    await pool.end();
    });

   test('GET /metaData/getjobTitles should return Jobtiltes', async () => {
        const res = await request(app).get("/metaData/getjobTitles");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);

    });

    test('GET /metaData/getCountryNames should return country names', async () => {
        const res = await request(app).get("/metaData/getCountryNames");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);

    });

    test('POST /metaData/createJobTitles should create a job title', async () => {
        const response = await request(app)
            .post("/metaData/createJobTitles")
            .send({
            title: "Software developer",
            code: "SDE",
            });

        expect(response.statusCode).toBe(201);

        expect(response.body).toHaveProperty("id");
        expect(response.body.title).toBe("Software developer");
        expect(response.body.code).toBe("SDE");
    });


})