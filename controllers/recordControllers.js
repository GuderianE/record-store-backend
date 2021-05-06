const Record = require("../models/Record")

exports.getRecords = async (req, res, next) => {
    try {
        const records = await Record.find()
        res.send(records)
    }
    catch (err) {
        next(err);
    }
}

exports.getRecord = async (req, res, next) => {
    const { id } = req.params;
    try {
        const record = await Record.findById(id)
        res.json(record)
    }
    catch (err) {
        next(err)
    }
}

exports.addRecord = async (req, res, next) => {
    const info = req.body
    try {
        const record = await Record.create(info)
        res.json(record)
    }
    catch (err) {
        next(err)
    }
}