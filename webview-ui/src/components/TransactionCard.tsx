import React, { useState } from 'react';
import { Transaction } from '../types/api/transaction';
import { TransactionDetailModal } from './TransactionDetailModal';
import { motion } from 'framer-motion';

interface TransactionCardProps {
    transaction: Transaction;
}

export const TransactionCard = ({ transaction }: TransactionCardProps) => {
    const [showModal, setShowModal] = useState(false);

    const lovelaceAmount = transaction.output_amount.find(amt => amt.unit === 'lovelace')?.quantity || '0';
    const formattedAda = (parseInt(lovelaceAmount) / 1000000).toFixed(6);

    // Format date from block_time (Unix timestamp)
    const date = new Date(transaction.block_time * 1000);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    // Determine if transaction includes NFTs
    const hasNFTs = transaction.output_amount.length > 1;

    // Type of transaction indicator
    const getTransactionType = () => {
        if (transaction.asset_mint_or_burn_count > 0) {
            return "Mint/Burn";
        } else if (hasNFTs) {
            return "Token Transfer";
        } else {
            return "ADA Transfer";
        }
    };

    return (
        <>
            <motion.div
                className="bg-[rgba(30,30,30,0.8)] rounded-[12px] border border-[rgba(255,255,255,0.12)] p-4 hover:bg-[rgba(40,40,40,0.8)] transition-colors cursor-pointer w-full"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setShowModal(true)}
            >
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-white text-base font-medium">{getTransactionType()}</span>
                        <span className="text-white font-semibold">{formattedAda} ₳</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-white/50 text-sm w-20">Tx Hash:</span>
                            <span className="text-white/70 text-sm truncate">{transaction.hash.slice(0, 16)}...</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-white/50 text-sm w-20">Date:</span>
                            <span className="text-white/70 text-sm">{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-white/50 text-sm w-20">Assets:</span>
                            <span className="text-white/70 text-sm">{hasNFTs ? 'ADA + Tokens' : 'ADA only'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-white/50 text-sm w-20">Fee:</span>
                            <span className="text-white/70 text-sm">{(parseInt(transaction.fees) / 1000000).toFixed(6)} ₳</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Render modal conditionally */}
            {showModal && (
                <TransactionDetailModal
                    transaction={transaction}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}; 