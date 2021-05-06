const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const recordSchema = new Schema({
    cover: {type: String, required: true},
    title: {type: String, required: true},
    artist: {type: String, required: true},
    year: {type: Number},
    price: {type: Number, required: true}
}, {
    versionKey: false,
    timestamps: true
});

const Record = model('Record', recordSchema);

module.exports = Record;