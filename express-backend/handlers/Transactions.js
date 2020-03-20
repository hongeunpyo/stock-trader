const Transaction = require('../schema/TransactionSchema');

const Transactions = async (req, res) => {
    console.log("Transactions retrieval requested...")
    try {
        const { userId } = req.body;
        const transactions = await Transaction.find({ user: userId }).sort({createdAt: -1});

        if (!transactions) {
            return res.status(404).json({message: 'No transactions found'});
        }

        return res.status(200).json(transactions);
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = Transactions;
