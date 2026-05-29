require('dotenv').config();

const express = require('express');
const cors = require('cors');

const employeeRoutes = require('./src/routes/employee.routes');
const metaDataRoutes = require('./src/routes/metaData.routes')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/employees', employeeRoutes);
app.use('/metaData', metaDataRoutes);

module.exports = app;