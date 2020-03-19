const fetch = require('node-fetch');

const Portfolio = async (req, res) => {
    // Read username and password from request body
    console.log("Stock search request received...")
    try {
        const apiQuery = `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&token=pk_fb2c11b11c644118b468d67e46cc9b43`;
        // return res.status(200).json({data: apiData});
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = Portfolio;
