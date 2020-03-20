const Stock = require('../schema/StockSchema');
const Transaction = require('../schema/TransactionSchema');
const User = require('../schema/UserSchema');

const saveTransaction = async (stock, user, transaction) => {
    await stock.save();
    await transaction.save();
    await user.save();
}

// Handler to buy and update stock portfolio and transaction history
const Buy = async (req, res) => {
    console.log("Stock buy request received...");
    try {
        const { userId, symbol, quantity, total } = req.body;
        // Convert dollar total to cents to update user currency
        const totalInCents = total * 100;
        // Ensures the DB will keep symbols all uppercase
        const uppercaseSymbol = symbol.toUpperCase();
        // Check to see if transaction data for a specific stock exists
        const user = await User.findById(userId);
        const stock = await Stock.findOne({
            user: userId, 
            symbol: uppercaseSymbol
        });
        
        const transaction = new Transaction({
            user: userId,
            shares: quantity,
            symbol: uppercaseSymbol,
            cents: totalInCents,
        });

        if (!user) {
            return res.status(404).json({message: 'User not found'})
        }

        const newUserTotal = user.cents - totalInCents; 
        user.cents = newUserTotal;

        if (user.cents < 0) {
            return res.status(400).json({message: 'Not enough funds to buy stocks!'});
        };

        // Update quantity if stock is bought again
        if (stock){
            console.log(stock.shares)
            stock.shares += parseInt(quantity);
            console.log(stock.shares)
            saveTransaction(stock, user, transaction);
            return res.status(200).json({
                total: user.cents,
                message: 'Existing stock quantity updated'
            });
        };

        const newStock = new Stock({
            user: userId,
            symbol: uppercaseSymbol,
            shares: quantity
        });

        saveTransaction(newStock, user, transaction);

        return res.status(200).json({total: user.cents});
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = Buy;
