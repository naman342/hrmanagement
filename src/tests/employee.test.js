const request = require('supertest');


const app = require('../../app')
const { pool } = require('../config/mysql.connection');

let jobTitleId;
let jobSdetTitleId;
let countryId;
let countryUSAId;

async function seedReferenceData() {
    await pool.execute('DELETE FROM employees');
    await pool.execute('DELETE FROM job_titles');
    await pool.execute('DELETE FROM countries');

    const [job] = await pool.execute(
        'INSERT INTO job_titles (title, code) VALUES (?, ?)',
        ['Software Engineer', 'SDE']
    );
    jobTitleId = job.insertId;

    const [job2] = await pool.execute(
        'INSERT INTO job_titles (title, code) VALUES (?, ?)',
        ['Software Developer Tester', 'SDET']
    );
    jobSdetTitleId = job2.insertId;

    const [country] = await pool.execute(
        'INSERT INTO countries (name, countryCode) VALUES (?, ?)',
        ['India', 'IN']
    );
    countryId = country.insertId;

    const [country2] = await pool.execute(
        'INSERT INTO countries (name, countryCode) VALUES (?, ?)',
        ['United States of America', 'USA']
    );
    countryUSAId = country2.insertId;
}

describe('Employee API', () => {

    beforeAll(async () => {
        await seedReferenceData();
    });

    beforeEach(async () => {
        await pool.execute('DELETE FROM employees');
    });
    afterAll(async () => {
         await pool.execute(
            'DELETE FROM employees'
        );
        await pool.execute("DELETE FROM job_titles");
        await pool.execute("DELETE FROM countries");

        await pool.end();

    });
    test('GET /employees/getAllEmployees should return employees', async () => {
        await request(app)
            .post('/employees')
            .send({
                fullName: 'Naman',
                jobTitle: jobTitleId,
                country: countryId,
                salary: 50000
            });
        const response =
            await request(app).get('/employees/getAllEmployees');
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
                jobTitle: jobTitleId,
                country: countryId,
                salary: 50000
            });

        expect(response.statusCode).toBe(201);

    });

    test('POST /employees should fail if fullName missing', async () => {

        const response = await request(app)
            .post('/employees')
            .send({
                jobTitle: jobTitleId,
                country: countryId,
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
                jobTitle: jobTitleId,
                country: countryId,
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
                jobTitle: jobTitleId,
                country: countryId,
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
            jobTitle: jobTitleId,
            country: countryId,
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
                jobTitle: jobTitleId,
                country: countryId,
                salary: 50000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'B',
                jobTitle: jobTitleId,
                country: countryId,
                salary: 90000
            });
        await request(app)
            .post('/employees')
            .send({
                fullName: 'C',
                jobTitle: jobTitleId,
                country: countryUSAId,
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
                jobTitle: jobTitleId,
                country: countryId,
                salary: 50000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'B',
                jobTitle: jobTitleId,
                country: countryId,
                salary: 90000
            });
        await request(app)
            .post('/employees')
            .send({
                fullName: 'C',
                jobTitle: jobTitleId,
                country: countryUSAId,
                salary: 100000
        });

        const response = await request(app)
            .get('/employees/maxSalary')
            .query({
                country: countryId
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.maxSalary).toBe(90000);
    });

    test('GET /employees/maxSalary should return max salary with jobTitle filter only', async () => {

        await request(app)
            .post('/employees')
            .send({
                fullName: 'A',
                jobTitle: jobTitleId,
                country: countryId,
                salary: 50000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'B',
                jobTitle: jobTitleId,
                country: countryUSAId,
                salary: 90000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'C',
                jobTitle: jobSdetTitleId,
                country: countryId,
                salary: 100000
            });

        const response = await request(app)
            .get('/employees/maxSalary')
            .query({
                jobTitle: jobTitleId
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.maxSalary).toBe(90000);
    });

    test('GET /employees/maxSalary should return max salary with country and jobTitle filters', async () => {
        await request(app)
            .post('/employees')
            .send({
                fullName: 'A',
                jobTitle: jobTitleId,
                country: countryId,
                salary: 50000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'B',
                jobTitle: jobTitleId,
                country: countryId,
                salary: 90000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'C',
                jobTitle: jobSdetTitleId,
                country: countryId,
                salary: 100000
            });

        const response = await request(app)
            .get('/employees/maxSalary')
            .query({
                country: countryId,
                jobTitle: jobTitleId
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.maxSalary).toBe(90000);
    });

    test('GET /employees/minSalary should return min salary without any filters', async () => {

        await request(app)
            .post('/employees')
            .send({
                fullName: 'A',
                jobTitle: jobTitleId,
                country: countryId,
                salary: 50000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'B',
                jobTitle: jobTitleId,
                country: countryId,
                salary: 90000
            });
        await request(app)
            .post('/employees')
            .send({
                fullName: 'C',
                jobTitle: jobTitleId,
                country: countryUSAId,
                salary: 100000
        });

        const response = await request(app)
            .get('/employees/minSalary')
            .query();

        expect(response.statusCode).toBe(200);
        expect(response.body.minSalary).toBe(50000);
    });
    test('GET /employees/minSalary should return min salary with country filters', async () => {

        await request(app)
            .post('/employees')
            .send({
                fullName: 'A',
                jobTitle: jobTitleId,
                country: countryId,
                salary: 50000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'B',
                jobTitle: jobTitleId,
                country: countryId,
                salary: 90000
            });
        await request(app)
            .post('/employees')
            .send({
                fullName: 'C',
                jobTitle: jobTitleId,
                country: countryUSAId,
                salary: 100000
        });
        await request(app)
            .post('/employees')
            .send({
                fullName: 'D',
                jobTitle: jobSdetTitleId,
                country: countryId,
                salary: 40000
            });

        const response = await request(app)
            .get('/employees/minSalary')
            .query({
                country: countryId
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.minSalary).toBe(40000);
    });

    test('GET /employees/minSalary should return min salary with jobTitle filter only', async () => {

        await request(app)
            .post('/employees')
            .send({
                fullName: 'A',
                jobTitle: jobTitleId,
                country: countryId,
                salary: 30000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'B',
                jobTitle: jobTitleId,
                country: countryUSAId,
                salary: 90000
            });
         await request(app)
            .post('/employees')
            .send({
                fullName: 'B',
                jobTitle: jobSdetTitleId,
                country: countryUSAId,
                salary: 40000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'C',
                jobTitle: jobSdetTitleId,
                country: countryId,
                salary: 100000
            });

        const response = await request(app)
            .get('/employees/minSalary')
            .query({
                jobTitle: jobTitleId
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.minSalary).toBe(30000);
    });

    test('GET /employees/minSalary should return min salary with country and jobTitle filters', async () => {
        await request(app)
            .post('/employees')
            .send({
                fullName: 'A',
                jobTitle: jobTitleId,
                country: countryId,
                salary: 20000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'B',
                jobTitle: jobTitleId,
                country: countryUSAId,
                salary: 90000
            });

        await request(app)
            .post('/employees')
            .send({
                fullName: 'C',
                jobTitle: jobSdetTitleId,
                country: countryId,
                salary: 100000
            });
        await request(app)
            .post('/employees')
            .send({
                fullName: 'D',
                jobTitle: jobSdetTitleId,
                country: countryId,
                salary: 30000
            });

        const response = await request(app)
            .get('/employees/minSalary')
            .query({
                country: countryId,
                jobTitle: jobTitleId
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.minSalary).toBe(20000);
    });

    test('GET /employees/getAllEmployees should return paginated results', async () => {

    // seed 5 employees
    for (let i = 1; i <= 5; i++) {
        await request(app)
            .post('/employees')
            .send({
                fullName: `User${i}`,
                jobTitle: jobTitleId,
                country: countryId,
                salary: 50000 + i
            });
    }

    const response = await request(app)
        .get('/employees/getAllEmployees')
        .query({
            page: 1,
            limit: 2
        });

    expect(response.statusCode).toBe(200);

    expect(response.body.length).toBe(2);
    }); 
    
    test('GET /employees/:id should return data for a employee', async() =>{
        const createResponse = await request(app)
            .post('/employees')
            .send({
                fullName: 'Shreyansh',
                jobTitle: jobTitleId,
                country: countryId,
                salary: 50000
        });

        const employeeId =
        createResponse.body.id;

        const response = await request(app)
            .get(`/employees/${employeeId}`);


        expect(response.statusCode).toBe(200);
        expect(response.body.fullName)
            .toBe('Shreyansh');
        expect(response.body.salary).toBe(50000);
        expect(response.body.country).toBe(countryId);
        expect(response.body.jobTitle).toBe(jobTitleId);
    })

    test('GET /employees/:id should return 404 if employee not found', async () =>{

        const id = Date.now() + 99999
        const response = await request(app)
            .get(`/employees/${id}`);
        expect(response.statusCode).toBe(404);

        expect(response.body.message)
            .toBe('Employee not found');

    });
    
});
