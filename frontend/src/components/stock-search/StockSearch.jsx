import React from 'react';

import GenericInput from '../generic-input/GenericInput';
import FancyButton from '../fancy-button/FancyButton'
import { useUserContext } from '../../context/user-context/UserContext';

const StockSearch = ({ symbol, name, primaryExchange, openPrice, currentPrice, handleSubmit, total }) => {
    const priceColor = currentPrice === openPrice ? '#d6d6d6' : currentPrice > openPrice ? 'green' : 'red';
    const [{ userTotal }] = useUserContext();
    return (
        <div className="flex flex-vertical-center flex-column">
            <div className="stock-item-container flex flex-vertical-center" style={{margin: '2em 0'}}>
                <div className='flex flex-column flex-vertical-center full-width full-height'>
                    <div className="flex flex-column" style={{margin: '0 auto 0 0'}}>
                        <span className="stock-item-title" style={{fontWeight: 600}}>
                            Cash - ${userTotal} 
                        </span>
                    </div>
                    {symbol &&
                        <>
                            <div className="flex flex-column" style={{margin: '0 auto auto 0'}}>
                                <span className="stock-item-title" style={{fontWeight: 600}}>
                                    {symbol} 
                                    <span style={{margin: '0 0 0 10px', fontSize: '12px'}}>({primaryExchange})</span>
                                </span>
                                <span className='stock-item-text-sub'>{name}</span>
                            </div>
                            <div className="flex flex-column" style={{margin: 'auto 0 0 auto'}}>
                                <span className="stock-item-text">Current: <span style={{color: priceColor}}>${currentPrice}</span></span>
                                <span className="stock-item-text-sub">Open: ${openPrice}</span>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div>
                <GenericInput title="Stock Symbol" id="ticker-input" placeholder="Enter Stock Symbol" formKey="symbol" />
                <GenericInput title="Quantity" id="quantity-input" placeholder="Enter Quantity" formKey="quantity" />
                <div className="stock-item-text" style={{margin: '0 0 0.5em'}}>Total: ${total}</div>
                <FancyButton text="Buy Now" clickHandler={handleSubmit} />
            </div>
        </div>
    )
}

export default StockSearch