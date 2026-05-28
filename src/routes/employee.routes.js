const express = require('express');

const router = express.Router();

const {
    createEmployee, getAllEmployees, getEmployee, updateEmployee, deleteEmployee, maxSalary, minSalary
} = require('../controllers/employee.controller');

router.get('/getAllEmployees', getAllEmployees);
router.post('/', createEmployee);
router.patch('/:id/salary', updateEmployee);
router.delete('/:id', deleteEmployee);
router.get('/maxSalary', maxSalary);
router.get('/minSalary', minSalary);
router.get('/:id', getEmployee)
 
module.exports = router;