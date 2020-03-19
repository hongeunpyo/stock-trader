import React from 'react';
import CardItem from '../card-item/CardItem';

const PortfolioItem = ({ ticker, name, numOfShares, openPrice, currentPrice }) => {
    const total = numOfShares * currentPrice;

    const priceColor = currentPrice === openPrice ? '#d6d6d6' : currentPrice > openPrice ? 'green' : 'red';
     return (
        <CardItem>
            <div className="flex flex-column" style={{margin: '0 5em 0 0'}}>
                <span className="card-item-text" style={{fontWeight: 600}}>{ticker} </span>
                <span className='card-item-text-sub'>{name}</span>
            </div>
            <div className="flex flex-column">
                <span className="card-item-text">Current: <span style={{color: priceColor}}>${currentPrice}</span></span>
                <span className="card-item-text-sub">Open: ${openPrice}</span>
            </div>
            <div className="card-last-item flex flex-column">
                <span className="card-item-text">{numOfShares} Shares @ <span style={{color: priceColor}}>${total}</span></span>
            </div>
        </CardItem>
    )
}

export default PortfolioItem;
