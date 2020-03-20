const ObjectId = require('mongoose').Types.ObjectId;

const Stock = require('../schema/StockSchema');
const Transaction = require('../schema/TransactionSchema');
const User = require('../schema/UserSchema');

// Handler to buy and update stock portfolio and transaction history
const Buy = async (req, res) => {
    console.log("Stock buy request received...");
    try {
        const { userId, symbol, quantity, total } = req.body;
        console.log(req.body);
        // Convert dollar total to cents to update user currency
        const totalInCents = total * 100;
        // Check to see if transaction data for a specific stock exists
        console.log(userId);
        const user = await User.findById(userId);
        console.log(user);
        const stock = await Stock.findOne({
            user: userId, 
            shares: quantity,
            symbol
        });
        
        const transaction = new Transaction({
            user: userId,
            shares: quantity,
            symbol
        });

        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }

        // Update quantity if stock is bought again
        if (stock){
            stock.quantity += quantity;

            await stock.save();
            await transaction.save();
            return res.status(200).json({
                message: 'Existing stock quantity updated'
            });
        };
    
        const newStock = new Stock({
            user: userId,
            symbol,
            shares: quantity
        });

        const newUserTotal = user.cents - totalInCents; 

        if (newUserTotal < 0) {
            return res.status(404).json({message: 'Not enough funds to buy stocks!'});
        };

        user.cents = newUserTotal;
        await newStock.save();
        await transaction.save();
        await user.save();

        return res.status(200).json({total: user.cents});
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = Buy;
