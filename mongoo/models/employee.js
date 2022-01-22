const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmploeeShema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    national_code: {
        type: String,
        required: true,
        min: 10,
        max: 10
    },
    sex: {
        type: String,
        enum: ['مرد', 'زن', 'سایر'],
        default: 'مرد'
    },
    manager: {
        type: Boolean,
        default: false
    },
    birthdate: {
        type: String,
        maxlength: 10
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: true
    }
})


module.exports = mongoose.model("Emploee", EmploeeShema);