const request = require('supertest');

const app = require('../../app');

describe('Employee API', () => {

    test('GET /employees should work', async () => {

        const response =
            await request(app).get('/employees');

        expect(response.statusCode).toBe(200);

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

        expect(response.body.fullName)
            .toBe('Naman');

    });

});