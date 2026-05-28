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

    test('PATCH /employees/:id/salary should update salary', async () => {
        const createResponse = await request(app)
            .post('/employees')
            .send({
                fullName: 'Naman',
                jobTitle: 'Software Engineer',
                country: 'India',
                salary: 50000
            });

        const employeeId =
            createResponse.body.id;

        const updateResponse = await request(app)
            .patch(`/employees/${employeeId}/salary`)
            .send({
                salary: 90000
            });

        expect(updateResponse.statusCode)
            .toBe(200);

        expect(updateResponse.body.salary)
            .toBe(90000);

    });

    test('DELETE /employees/:id should mark employee inactive', async () => {

    const createResponse = await request(app)
        .post('/employees')
        .send({
            fullName: 'Naman',
            jobTitle: 'SDE',
            country: 'India',
            salary: 50000
        });

    const id = createResponse.body.id;

    const deleteResponse = await request(app)
        .delete(`/employees/${id}`);

    expect(deleteResponse.statusCode)
        .toBe(200);

    expect(deleteResponse.body.active)
        .toBe(0);
    });

    test('GET /employees/maxSalary should return max salary without any filters', async () => {

        await request(app)
            .post('/employees')
            .send({
                fullName: 'A',
                jobTitle: 'SDE',
                country: 'India',
                salary: 50000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'B',
                jobTitle: 'SDE',
                country: 'India',
                salary: 90000
            });
        await request(app)
            .post('/employees')
            .send({
                fullName: 'C',
                jobTitle: 'SDE',
                country: 'USA',
                salary: 100000
        });

        const response = await request(app)
            .get('/employees/maxSalary')
            .query();

        expect(response.statusCode).toBe(200);
        expect(response.body.maxSalary).toBe(100000);
    });

    test('GET /employees/maxSalary should return max salary with country filters', async () => {

        await request(app)
            .post('/employees')
            .send({
                fullName: 'A',
                jobTitle: 'SDE',
                country: 'India',
                salary: 50000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'B',
                jobTitle: 'SDE',
                country: 'India',
                salary: 90000
            });
        await request(app)
            .post('/employees')
            .send({
                fullName: 'C',
                jobTitle: 'SDE',
                country: 'USA',
                salary: 100000
        });

        const response = await request(app)
            .get('/employees/maxSalary')
            .query({
                country: 'INDIA'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.maxSalary).toBe(90000);
    });

    test('GET /employees/maxSalary should return max salary with jobTitle filter only', async () => {

        await request(app)
            .post('/employees')
            .send({
                fullName: 'A',
                jobTitle: 'SDE',
                country: 'India',
                salary: 50000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'B',
                jobTitle: 'SDE',
                country: 'USA',
                salary: 90000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'C',
                jobTitle: 'SDET',
                country: 'India',
                salary: 100000
            });

        const response = await request(app)
            .get('/employees/maxSalary')
            .query({
                jobTitle: 'SDE'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.maxSalary).toBe(90000);
    });

    test('GET /employees/maxSalary should return max salary with country and jobTitle filters', async () => {
        await request(app)
            .post('/employees')
            .send({
                fullName: 'A',
                jobTitle: 'SDE',
                country: 'India',
                salary: 50000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'B',
                jobTitle: 'SDE',
                country: 'India',
                salary: 90000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'C',
                jobTitle: 'SDET',
                country: 'India',
                salary: 100000
            });

        const response = await request(app)
            .get('/employees/maxSalary')
            .query({
                country: 'India',
                jobTitle: 'SDE'
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.maxSalary).toBe(90000);
    });

     test('GET /employees/minSalary should return min salary without any filters', async () => {

        await request(app)
            .post('/employees')
            .send({
                fullName: 'A',
                jobTitle: 'SDE',
                country: 'India',
                salary: 50000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'B',
                jobTitle: 'SDE',
                country: 'India',
                salary: 90000
            });
        await request(app)
            .post('/employees')
            .send({
                fullName: 'C',
                jobTitle: 'SDE',
                country: 'USA',
                salary: 100000
        });

        const response = await request(app)
            .get('/employees/maxSalary')
            .query();

        expect(response.statusCode).toBe(200);
        expect(response.body.maxSalary).toBe(50000);
    });

    
    
});

