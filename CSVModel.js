const mongoose = require('mongoose');

const csvSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

const CSVModel = mongoose.model('CSVModel', csvSchema);

module.exports = CSVModel;
