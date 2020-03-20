const fetch = require('node-fetch');
const Stock = require('../schema/StockSchema');

const Portfolio = async (req, res) => {
    console.log("Portfolio retrieval requested...")
    try {
        const { userId } = req.body;
        const stocks = await Stock.find({ user: userId });

        if (!stocks) {
            return res.status(404).json({message: 'No stocks found'});
        }

        const symbols = stocks.map((stock) => stock.symbol).join(',');
        const apiQuery = `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&token=pk_fb2c11b11c644118b468d67e46cc9b43`;
        const apiResponse = await fetch(apiQuery)

        const apiData = await apiResponse.json();

        if (apiData.error) {
            return res.status(400).json({message: apiData.error});
        }

        // Append stock quantity a user has to iex API response
        stocks.forEach((stock) => {
            apiData[stock.symbol].shares = stock.shares;
        });

        return res.status(200).json(apiData);
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = Portfolio;
