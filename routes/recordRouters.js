const express = require('express');
const recordRouters = express.Router();
const {
    getRecords,
    addRecord,
    getRecord
} = require('../controllers/recordControllers');

recordRouters.route('/').get(getRecords).post(addRecord);
recordRouters.route('/:id').get(getRecord);

module.exports = recordRouters;