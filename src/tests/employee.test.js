const request = require('supertest');

const app = require('../../app');

describe('Employee API', () => {

    test('GET /employees should work', async () => {

        const response =
            await request(app).get('/employees');

        expect(response.statusCode).toBe(200);

        expect(response.body.message)
            .toBe('Employee route working');

    });

});