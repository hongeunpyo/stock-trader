import React from 'react';

import GenericInput from '../generic-input/GenericInput';
import FancyButton from '../fancy-button/FancyButton'

const StockSearch = ({ ticker, name, primaryExchange, openPrice, currentPrice, handleSubmit }) => {
    const priceColor = currentPrice === openPrice ? '#d6d6d6' : currentPrice > openPrice ? 'green' : 'red';

    return (
        <div className="flex flex-vertical-center flex-column">
            <div className="stock-item-container flex flex-vertical-center" style={{margin: '2em 0'}}>
                {ticker &&
                    <div className='flex flex-column flex-vertical-center full-width full-height'>
                        <div className="flex flex-column" style={{margin: '0 auto auto 0'}}>
                            <span className="stock-item-title" style={{fontWeight: 600}}>
                                {ticker} 
                                <span style={{margin: '0 0 0 10px', fontSize: '12px'}}>({primaryExchange})</span>
                            </span>
                            <span className='stock-item-text-sub'>{name}</span>
                        </div>
                        <div className="flex flex-column" style={{margin: 'auto 0 0 auto'}}>
                            <span className="stock-item-text">Current: <span style={{color: priceColor}}>${currentPrice}</span></span>
                            <span className="stock-item-text-sub">Open: ${openPrice}</span>
                        </div>
                    </div>
                }
            </div>
            <div>
                <GenericInput title="Stock Symbol" id="ticker-input" placeholder="Enter Stock Symbol" formKey="ticker"/>
                <GenericInput title="Quantity" id="quantity-input" placeholder="Enter Quantity" formKey="quantity"/>
                <FancyButton text="Buy Now" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default StockSearch