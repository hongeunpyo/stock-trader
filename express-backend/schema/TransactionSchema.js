const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: 'User Id is needed'
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

module.exports = mongoose.model('Transaction', TransactionSchema);
