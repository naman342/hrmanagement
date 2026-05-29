const request = require('supertest');


const app = require('../../app')
const { pool } = require('../config/mysql.connection');

describe('MetaData API',()=>{

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
            code: "META_SDE",
            });

        expect(response.statusCode).toBe(201);

        expect(response.body).toHaveProperty("id");
        expect(response.body.title).toBe("Software developer");
        expect(response.body.code).toBe("META_SDE");
    });

    test('POST /metaData/createCountryNames should create a country name', async () => {
        const response = await request(app)
            .post("/metaData/createCountryNames")
            .send({
                name: "Meta Test Country",
                countryCode: "MTC",
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Meta Test Country");
        expect(response.body.countryCode).toBe("MTC");
    });

})