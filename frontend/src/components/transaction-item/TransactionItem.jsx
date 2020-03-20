import React from 'react';
import CardItem from '../card-item/CardItem';

const TransactionItem = ({ symbol, numOfShares, total }) => {

     return (
        <CardItem>
            <div className="card-first-item flex flex-column" style={{margin: '0 5em 0 0'}}>
                <span className="card-item-text" style={{fontWeight: 600}}>{symbol} - </span>
            </div>
            <div className="card-last-item flex flex-column">
                <span className="card-item-text">{numOfShares} Shares @ {total}</span>
            </div>
        </CardItem>
    )
}

export default TransactionItem;
