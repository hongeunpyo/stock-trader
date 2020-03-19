import React, { useState, useEffect } from 'react';

import SplitPage from "../templates/SplitPage";
import PortfolioItem from '../../components/portfolio-item/PortfolioItem';
import StockSearch from '../../components/stock-search/StockSearch';
import { useFormContext } from '../../context/form-context/FormContext';
import { postWithToken } from '../../utils/utils';
import { useAuthContext } from '../../context/auth-context/AuthContext';
import useDebounce from '../../utils/DebounceHook';

const mockData = {
    symbol: "AAOI",
    companyName: "Applied Optoelectronics, Inc.",
    primaryExchange: "NDSAQA",
    calculationPrice: "close",
    open: 5.8,
    openTime: 1605856722037,
    close: 6.21,
    closeTime: 1662233922730,
    high: 6.42,
    low: 5.67,
    latestPrice: 6.25,
    previousClose: 5.89,
    previousVolume: 790382,
    change: 0.33,
    changePercent: 0.05809,
    marketCap: 126533724,
    peRatio: -1.84,
    week52High: 16.56,
    week52Low: 5.38,
    ytdChange: -0.4958081361212221,
    lastTradeTime: 1587317538038,
    isUSMarketOpen: false
};

const PortfolioPage = () => {
    const [stockData, setStockData] = useState();
    const [{ token }] = useAuthContext();
    const [{ values }] = useFormContext();
    
    const debouncedTicker = useDebounce(values.ticker, 500);

    const handleSearch = async (value) => {
        const stringifiedBody = JSON.stringify({ticker: value});
        const searchUrl = 'http://localhost:8000/search';
        const data = await postWithToken(searchUrl, token, stringifiedBody);
        console.log(data);
    }

    useEffect(() => {
        if (debouncedTicker) {
            handleSearch(debouncedTicker)
        }
    }, [debouncedTicker])

    const renderLeft = (
        <PortfolioItem 
            ticker={mockData.symbol}
            name={mockData.companyName}
            numOfShares={5}
            openPrice={mockData.open}
            currentPrice={mockData.latestPrice}
        />
    );

    const renderRight = (
        <StockSearch
            ticker={mockData.symbol}
            name={mockData.companyName}
            primaryExchange={mockData.primaryExchange}
            openPrice={mockData.open}
            currentPrice={mockData.latestPrice}
            handleSearch={handleSearch}
        />
    )

    return (
        <SplitPage 
            title={`Portfolio`} 
            renderLeft={renderLeft}
            renderRight={renderRight}
        />
    )
}

export default PortfolioPage;
