const fetch = require('node-fetch');

const Search = async (req, res) => {
    // Read username and password from request body
    console.log("Stock search request received...")
    const { ticker } = req.body;
    try {
        console.log(req.body);
        const apiQuery = `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=pk_fb2c11b11c644118b468d67e46cc9b43`;
        const apiResponse = await fetch(apiQuery)
    
        const apiData = await apiResponse.json();

        return res.status(200).json({data: apiData});
    }
    catch (err) {
        return res.status(500).json({message: err.message});
    }
}

module.exports = Search;
