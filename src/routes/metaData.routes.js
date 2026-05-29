const express = require('express');

const router = express.Router();

const {
    getjobTitles, 
} = require('../controllers/metaData.controller');

router.get('/getjobTitles', getjobTitles);

 
module.exports = router;