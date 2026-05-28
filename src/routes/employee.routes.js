const express = require('express');

const router = express.Router();

const {
    createEmployee
} = require('../controllers/employee.controller');

router.get('/', (req, res) => {

    res.json({
        message: 'Employee route working'
    });

});

router.post('/', createEmployee);

module.exports = router;