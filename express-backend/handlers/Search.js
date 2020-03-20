require('dotenv').config();

const fetch = require('node-fetch');

const Search = async (req, res) => {
    console.log("Stock search request received...");
    const { ticker } = req.body;
    try {
        // Query API with stock symbol
        const apiQuery = `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${process.env.API_CONFIG}`;
        const apiResponse = await fetch(apiQuery)
    
        const apiData = await apiResponse.json();

        return res.status(200).json(apiData);
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = Search;
