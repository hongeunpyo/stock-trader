import React, { useState, useEffect } from 'react';

import SplitPage from "../templates/SplitPage";
import PortfolioItem from '../../components/portfolio-item/PortfolioItem';
import StockSearch from '../../components/stock-search/StockSearch';
import { useFormContext } from '../../context/form-context/FormContext';
import { postWithToken } from '../../utils/utils';
import { useUserContext, UserActions } from '../../context/user-context/UserContext';
import useDebounce from '../../utils/DebounceHook';

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
    const [needsUpdate, setNeedsUpdate] = useState();

    const [{ loggedIn, userId, token, userTotal }, userDispatch] = useUserContext();
    const [{ values }] = useFormContext();
    
    const debouncedTicker = useDebounce(values.symbol, 500);

    const handleSearch = async (value) => {
        const stringifiedBody = JSON.stringify({"ticker": value});
        const searchUrl = 'http://localhost:8000/search';
        const data = await postWithToken(searchUrl, token, stringifiedBody);
        console.log(data);
        setStockData(data);
    }

    const handleSubmit = async () => {
        const body = JSON.stringify({
            total: total,
            userId,
            ...values
        });

        const buyUrl = 'http://localhost:8000/buy';
        const data = await postWithToken(buyUrl, token, body);
        console.log(data);
        const cents = parseInt(data.total);
        const dollars = cents / 100;
        if (dollars) {
            userDispatch({
                type: UserActions.UPDATE_TOTAL,
                payload: {userTotal: dollars}
            });
            setNeedsUpdate(true);
        }
    }

    useEffect(() => {
        // IFFE to retrieve portfolio data
        (async () => {
            if (loggedIn) {
                const body = JSON.stringify({ userId });
        
                const portfolioUrl = 'http://localhost:8000/portfolio';
                const data = await postWithToken(portfolioUrl, token, body);
                console.log(data);
                setPortfolioData(data);
                setNeedsUpdate(false);
            }
        })()
    }, [loggedIn, needsUpdate]);

    useEffect(() => {
        if (!!stockData.latestPrice) {
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
        console.log(portfolioData);

        const dataKeys = Object.keys(portfolioData);
        return dataKeys.map((key, index) => {
            return (
                <>
                    <PortfolioItem
                        symbol={portfolioData[key].quote.symbol}
                        name={portfolioData[key].quote.companyName}
                        numOfShares={portfolioData[key].shares}
                        openPrice={portfolioData[key].quote.open}
                        currentPrice={portfolioData[key].quote.latestPrice}
                    />
                    {(index !== (dataKeys.length - 1)) && <hr className='item-divider'/>}
                </>
            )
        })
    }

    const renderLeft = renderPortfolioItems();
    console.log(stockData);
    const renderRight = (
        <StockSearch
            symbol={stockData.symbol}
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
