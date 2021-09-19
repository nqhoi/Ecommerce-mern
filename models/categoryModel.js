const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        trim: true,
        unique: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Category', categorySchema);