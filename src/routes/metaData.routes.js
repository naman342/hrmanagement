const express = require('express');

const router = express.Router();

const {
    getjobTitles,
    createJobTitles,
    getCountryNames,
    createCountryNames
} = require('../controllers/metaData.controller');

router.get('/getjobTitles', getjobTitles);
router.post('/createJobTitles', createJobTitles);
router.get('/getCountryNames', getCountryNames)
router.post('/createCountryNames', createCountryNames)

 
module.exports = router;