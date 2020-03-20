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
    const [stockSum, setStockSum] = useState(0);
    const [total, setTotal] = useState(0);
    const [portfolioData, setPortfolioData] = useState();
    const [needsUpdate, setNeedsUpdate] = useState();

    const [{ loggedIn, userId, token }, userDispatch] = useUserContext();
    const [{ values }] = useFormContext();
    
    const debouncedTicker = useDebounce(values.symbol, 500);

    const handleSearch = async (value) => {
        const stringifiedBody = JSON.stringify({"ticker": value});
        const searchUrl = 'http://ec2-3-21-232-246.us-east-2.compute.amazonaws.com:8000/search';
        const data = await postWithToken(searchUrl, token, stringifiedBody);
        
        if (!data) {
            return;
        }
        
        setStockData(data);
    }

    const handleSubmit = async () => {
        const body = JSON.stringify({
            total,
            userId,
            ...values
        });

        const buyUrl = 'http://ec2-3-21-232-246.us-east-2.compute.amazonaws.com:8000/buy';
        const data = await postWithToken(buyUrl, token, body);

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
        
                const portfolioUrl = 'http://ec2-3-21-232-246.us-east-2.compute.amazonaws.com:8000/portfolio';
                const data = await postWithToken(portfolioUrl, token, body);

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

    useEffect(() => {
        if (!portfolioData) {
            return;
        }

        const calculateTotal = () => {
            const dataKeys = Object.keys(portfolioData);
            let total = 0;
            dataKeys.forEach((key) => {
                total += portfolioData[key].quote.latestPrice * portfolioData[key].shares;
            })
            setStockSum(total);
        }

        calculateTotal();
    }, [portfolioData])

    const renderPortfolioItems = () => {
        if (!portfolioData) {
            return null;
        }

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
            title={`Portfolio ($${stockSum})`} 
            renderLeft={renderLeft}
            renderRight={renderRight}
        />
    )
}

export default PortfolioPage;
