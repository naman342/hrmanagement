const express = require('express');

const router = express.Router();

const {
    createEmployee, getEmployees, updateEmployee, deleteEmployee, maxSalary, minSalary
} = require('../controllers/employee.controller');

router.get('/', getEmployees);
router.post('/', createEmployee);
router.patch('/:id/salary', updateEmployee);
router.delete('/:id', deleteEmployee);
router.get('/maxSalary', maxSalary);
router.get('/minSalary', minSalary)
 
module.exports = router;