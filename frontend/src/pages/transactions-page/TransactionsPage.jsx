import React, { useState, useEffect } from 'react';

import SplitPage from "../templates/SplitPage";
import TransactionItem from '../../components/transaction-item/TransactionItem';
import { postWithToken } from '../../utils/utils';
import { useUserContext } from '../../context/user-context/UserContext';

const TransactionsPage = () => {
    const [transactionData, setTransactionData] = useState();
    const [{ loggedIn, userId, token, userTotal }, userDispatch] = useUserContext();

    useEffect(() => {
        // IFFE to retrieve transaction data
        (async () => {
            if (loggedIn) {
                const body = JSON.stringify({ userId });
        
                const transactionsUrl = 'http://ec2-3-21-232-246.us-east-2.compute.amazonaws.com:8000/transactions';
                const data = await postWithToken(transactionsUrl, token, body);
                setTransactionData(data);
            }
        })()
    }, [loggedIn]);

    const renderTransactionItems = () => {
        if (!transactionData) {
            return null;
        }

        return transactionData.map((transaction, index) => {
            const dollarTotal = parseInt(transaction.cents) / 100 || 0;
            return (
                <>
                    <TransactionItem
                        symbol={transaction.symbol}
                        numOfShares={transaction.shares}
                        total={dollarTotal}
                    />
                    {(index !== (transactionData.length - 1)) && <hr className='transaction-divider'/>}
                </>
            )
        })
    }

    const renderLeft = renderTransactionItems();

    return (
        <SplitPage 
            title="Transactions"
            renderLeft={renderLeft}
        />
    )
}

export default TransactionsPage;
