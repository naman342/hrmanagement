const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {

    res.json({
        message: 'Employee route working'
    });

});

module.exports = router;