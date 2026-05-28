const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {

    res.json({
        message: 'Employee route working'
    });

});

router.post('/', (req, res) => {

    res.status(201).json(req.body);

});

module.exports = router;