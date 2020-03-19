const fetch = require('node-fetch');
const mongoose = require('mongoose');

const Transaction = require('../schema/TransactionSchema');
const User = require('../schema/UserSchema');

const Buy = async (req, res) => {
    console.log("Stock search request received...")
    try {
        const { userId, symbol, quantity, total } = req.body;

        // Convert dollar total to cents to update user currency
        const totalInCents = total * 100;
        // Check to see if transaction data for a specific stock exists
        const user = await User.findOne({_id: userId});
        const transaction = await Transaction.findOne({user: mongoose.Types.ObjectId(userId), symbol})
        // Update quantity if stock is bought again
        if (transaction){
            transaction.quantity += quantity;
            await transaction.save();
            return res.status(200).json({
                message: 'The email you entered is already registed to another account'
            });
        }
    
        const newTransaction = new Transaction({user, symbol, quantity});
        await newTransaction.save();

        const newUserTotal = user.cents - totalInCents; 

        if (newUserTotal < 0) {
            return res.status(404).json({message: 'Not enough funds to buy stocks!'});
        };

        user.cents = newUserTotal;
        await user.save();

        return res.status(200).json({total: user.cents});
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = Buy;
