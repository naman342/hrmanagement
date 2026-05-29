const express = require('express');

const router = express.Router();

const {
    getjobTitles,
    getCountryNames
} = require('../controllers/metaData.controller');

router.get('/getjobTitles', getjobTitles);
router.get('/getCountryNames', getCountryNames)

 
module.exports = router;