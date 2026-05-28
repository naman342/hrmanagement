const express = require('express');

const router = express.Router();

const {
    createEmployee, getEmployees, updateEmployee
} = require('../controllers/employee.controller');

router.get('/', getEmployees);

router.post('/', createEmployee);
router.patch('/:id/salary', updateEmployee);

module.exports = router;