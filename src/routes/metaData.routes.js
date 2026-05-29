const express = require('express');

const router = express.Router();

const {
    getjobTitles,
    createJobTitles,
    getCountryNames
} = require('../controllers/metaData.controller');

router.get('/getjobTitles', getjobTitles);
router.post('/createJobTitles', createJobTitles);
router.get('/getCountryNames', getCountryNames)

 
module.exports = router;