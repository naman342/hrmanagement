const express = require('express');

const router = express.Router();

const {
    createEmployee, getEmployees
} = require('../controllers/employee.controller');

router.get('/', getEmployees);

router.post('/', createEmployee);

module.exports = router;