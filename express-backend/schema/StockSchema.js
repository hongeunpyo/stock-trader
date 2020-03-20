const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: 'User Id is needed',
        ref: 'User'
    },
    symbol: {
        type: String,
        required: 'Symbol is required',
        trim: true
    },
    shares: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

module.exports = mongoose.model('Stock', StockSchema);
