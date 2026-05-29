
HR Management Backend API

A Node.js + Express + MySQL backend for managing employees, job titles, and countries with pagination, testing, and database seeding support.

Features
    Employee management (create, list)
    Job titles & countries master data
    Cursor-based pagination for large datasets
    Separate test database support
    Jest testing setup
    Seed scripts for quick data generation

Stack
    Node.js
    Express.js
    MySQL2
    Jest


Setup
    Create a .env file in root:
        PORT=3000
        DB_HOST=localhost
        DB_USER=********
        DB_PASSWORD=********
        DB_NAME=hr_management_db
        TEST_DB_NAME=hr_management_test
    npm install
    create both databases
    npm run seed:createTable
    npm run seed:createTableForTest
    npm run seed:employees
    npm run dev

Backend Is running on Port 3000


For more details use link : https://docs.google.com/document/d/1hHp0qdb5UWLrF66MHfik8TNvL13EiyZoONZ5OLa5euU/edit?tab=t.0