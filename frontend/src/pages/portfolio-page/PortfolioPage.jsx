import React, { useState, useEffect } from 'react';

import SplitPage from "../templates/SplitPage";
import PortfolioItem from '../../components/portfolio-item/PortfolioItem';
import StockSearch from '../../components/stock-search/StockSearch';
import { useFormContext } from '../../context/form-context/FormContext';
import { postWithToken } from '../../utils/utils';
import { useUserContext, UserActions } from '../../context/user-context/UserContext';
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
    const [stockData, setStockData] = useState({
        ticker: '',
        name: '',
        primaryExchange: '',
        open: 0,
        latestPrice: '',
    });
    const [total, setTotal] = useState(0);
    const [portfolioData, setPortfolioData] = useState();
    const [{ loggedIn, userId, token, userTotal }, userDispatch] = useUserContext();
    const [{ values }] = useFormContext();
    
    const debouncedTicker = useDebounce(values.symbol, 500);

    const handleSearch = async (value) => {
        const stringifiedBody = JSON.stringify({"ticker": value});
        const searchUrl = 'http://localhost:8000/search';
        const data = await postWithToken(searchUrl, token, stringifiedBody);
        setStockData(data);
    }

    const handleSubmit = async () => {
        const body = JSON.stringify({
            total: total,
            userId,
            ...values
        });

        const stringifiedBody = JSON.stringify(body);
        const buyUrl = 'http://localhost:8000/buy';
        const data = await postWithToken(buyUrl, token, body);
        const cents = parseInt(data.total);
        const dollars = cents / 100;
        if (dollars) {
            userDispatch({
                type: UserActions.UPDATE_TOTAL,
                payload: {userTotal: dollars}
            });
        }
    }

    useEffect(() => {
        // IFFE to retrieve portfolio data
        (async () => {
            if (loggedIn) {
                const body = JSON.stringify({ userId });
        
                const portfolioUrl = 'http://localhost:8000/portfolio';
                const data = await postWithToken(portfolioUrl, token, body);
                setPortfolioData(data);
            }
        })()
    }, [loggedIn]);

    useEffect(() => {
        if (!!stockData.open) {
            setTotal((values.quantity * stockData.latestPrice).toFixed(2));
        }
    }, [values.quantity])

    useEffect(() => {
        if (debouncedTicker) {
            handleSearch(debouncedTicker)
        }
    }, [debouncedTicker])

    const renderPortfolioItems = () => {
        if (!portfolioData) {
            return null;
        }

        const dataKeys = Object.keys(portfolioData);
        return dataKeys.map((key, index) => {
            return (
                <>
                    <PortfolioItem
                        ticker={portfolioData[key].quote.symbol}
                        name={portfolioData[key].quote.companyName}
                        numOfShares={5}
                        openPrice={portfolioData[key].quote.open}
                        currentPrice={portfolioData[key].quote.latestPrice}
                    />
                    {(index !== (dataKeys.length - 1)) && <hr className='item-divider'/>}
                </>
            )
        })
    }

    const renderLeft = renderPortfolioItems();

    console.log(renderLeft);
    const renderRight = (
        <StockSearch
            ticker={stockData.symbol}
            name={stockData.companyName}
            primaryExchange={stockData.primaryExchange}
            openPrice={stockData.open}
            currentPrice={stockData.latestPrice}
            handleSearch={handleSearch}
            handleSubmit={handleSubmit}
            total={total}
        />
    )

    return (
        <SplitPage 
            title={`Portfolio ($${userTotal})`} 
            renderLeft={renderLeft}
            renderRight={renderRight}
        />
    )
}

export default PortfolioPage;
