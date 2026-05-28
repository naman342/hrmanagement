const request = require('supertest');


const app = require('../../app')
const { pool } = require('../config/mysql.connection');

describe('Employee API', () => {

    beforeEach(async () => {
        await pool.execute(
            'DELETE FROM employees'
        );

    });
    afterAll(async () => {

        await pool.end();

    });
    test('GET /employees should return employees', async () => {
        await request(app)
            .post('/employees')
            .send({
                fullName: 'Naman',
                jobTitle: 'Software Engineer',
                country: 'India',
                salary: 50000
            });

        const response =
            await request(app).get('/employees');
        console.log(response.body ,"response")
        expect(response.statusCode).toBe(200);

        expect(response.body.length)
            .toBe(1);

        expect(response.body[0].fullName)
            .toBe('Naman');

    });

    test('POST /employees should create employee', async () => {

        const response = await request(app)
            .post('/employees')
            .send({
                fullName: 'Naman',
                jobTitle: 'Software Engineer',
                country: 'India',
                salary: 50000
            });

        expect(response.statusCode).toBe(201);

    });

    test('POST /employees should fail if fullName missing', async () => {

        const response = await request(app)
            .post('/employees')
            .send({
                jobTitle: 'Software Engineer',
                country: 'India',
                salary: 50000
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.message)
            .toBe('Full name is required');

    });

    test('POST /employees should fail for negative salary', async () => {

        const response = await request(app)
            .post('/employees')
            .send({
                fullName: 'Naman',
                jobTitle: 'Software Engineer',
                country: 'India',
                salary: -100
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.message)
            .toBe('Salary must be positive');

    });
});