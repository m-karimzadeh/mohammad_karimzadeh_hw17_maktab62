const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CompanyShema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    registration_number: {
        type: Number,
        default: null
    },
    city: {
        type: String,
        maxlength: 30,
        required: true,
        trim: true
    },
    state: {
        type: String,
        maxlength: 30,
        required: true,
        trim: true
    },
    registration_date: {
        type: String,
        default: null,
        maxlength: 10
    },
    phone: {
        type: String,
        maxlength: 11,
        required: true,
        trim: true
    }
})


module.exports = mongoose.model("Company", CompanyShema);