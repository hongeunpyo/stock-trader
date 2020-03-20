const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
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
    name: {
        type: String,
    },
    cents: {
        type: Number,
    },
    shares: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

module.exports = mongoose.model('Transaction', TransactionSchema);
