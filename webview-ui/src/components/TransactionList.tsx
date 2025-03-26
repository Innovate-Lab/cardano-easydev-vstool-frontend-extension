import React from 'react';
import { Transaction } from '../types/api/transaction';
import { TransactionCard } from './TransactionCard';

interface TransactionListProps {
    transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            {transactions.length === 0 ? (
                <div className="text-center text-white/50 text-[16px] font-['PP_Mori']">
                    No transactions found
                </div>
            ) : (
                <div className="flex flex-col w-full space-y-4">
                    {transactions.map((transaction) => (
                        <TransactionCard
                            key={transaction.hash}
                            transaction={transaction}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}; 