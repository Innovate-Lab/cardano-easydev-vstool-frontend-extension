import React from 'react';
import { Transaction } from '../types/api/transaction';
import { motion } from 'framer-motion';
import { messageHandler } from '@estruyf/vscode/dist/client'

interface TransactionDetailModalProps {
    transaction: Transaction;
    onClose: () => void;
}

export const TransactionDetailModal = ({ transaction, onClose }: TransactionDetailModalProps) => {
    // Format date from block_time (Unix timestamp)
    const date = new Date(transaction.block_time * 1000);

    // Calculate total ADA amount
    const lovelaceAmount = transaction.output_amount.find(amt => amt.unit === 'lovelace')?.quantity || '0';
    const formattedAda = (parseInt(lovelaceAmount) / 1000000).toFixed(6);

    const formatAssetName = (unit: string) => {
        if (unit === 'lovelace') return 'ADA';

        // Try to extract human-readable part if it exists
        const hexPart = unit.slice(56); // Assuming the policy ID is 56 chars
        if (!hexPart) return unit;

        try {
            // Convert hex to ASCII if possible
            return hexPart.length % 2 === 0
                ? hexToAscii(hexPart)
                : unit.slice(-12); // Fallback to showing last part
        } catch {
            return unit.slice(-12); // Fallback to showing last part
        }
    };

    const hexToAscii = (hex: string) => {
        let ascii = '';
        for (let i = 0; i < hex.length; i += 2) {
            const part = hex.substring(i, i + 2);
            ascii += String.fromCharCode(parseInt(part, 16));
        }
        return ascii;
    };

    const handleViewOnExplorer = async () => {
        await messageHandler.request<string>("VIEW_ON_EXPLORER", transaction.hash);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 m-0 px-4" style={{ "marginTop": "0px" }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#121212] border border-[#2A2A2A] rounded-[8px] max-w-lg w-full max-h-[90vh] overflow-y-auto m-0"
            >
                {/* Updated Header - more compact with less space */}
                <div className="flex justify-between items-center py-3 px-4 border-b border-[#2A2A2A] bg-[#181818]">
                    <h3 className="text-white text-base">Transaction Details</h3>
                    <button onClick={onClose} className="text-white/70 hover:text-white">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Transaction Summary - more compact design to match screenshot */}
                <div className="p-4">
                    <div className="bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] p-4 mb-4">
                        <div className="grid gap-3">
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between">
                                    <span className="text-white/70 text-sm">Transaction Hash</span>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(transaction.hash)}
                                        className="text-white/50 hover:text-white ml-2"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <span className="text-white font-mono text-sm break-all">{transaction.hash}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-white/70 text-sm">Amount</span>
                                <span className="text-white">{formattedAda} ₳</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-white/70 text-sm">Date & Time</span>
                                <span className="text-white text-sm">{date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-white/70 text-sm">Fee</span>
                                <span className="text-white text-sm">{(parseInt(transaction.fees) / 1000000).toFixed(6)} ₳</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-white/70 text-sm">Status</span>
                                <span className="text-[#00FFB3] bg-[rgba(0,255,179,0.1)] px-2 py-1 rounded-full text-xs">
                                    Confirmed
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Additional Details - more clean spacing */}
                    <div className="mb-4">
                        <h4 className="text-white text-base mb-3">Additional Details</h4>

                        <div className="grid grid-cols-2 gap-y-3">
                            <div className="flex flex-col">
                                <span className="text-white/70 text-sm">Block</span>
                                <span className="text-white text-sm truncate">{transaction.block.slice(0, 15)}...</span>
                            </div>

                            <div className="flex flex-col text-right">
                                <span className="text-white/70 text-sm">Block Height</span>
                                <span className="text-white text-sm">{transaction.block_height}</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-white/70 text-sm">Slot</span>
                                <span className="text-white text-sm">{transaction.slot}</span>
                            </div>

                            <div className="flex flex-col text-right">
                                <span className="text-white/70 text-sm">Size</span>
                                <span className="text-white text-sm">{transaction.size} bytes</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-white/70 text-sm">UTXO Count</span>
                                <span className="text-white text-sm">{transaction.utxo_count}</span>
                            </div>

                            <div className="flex flex-col text-right">
                                <span className="text-white/70 text-sm">Asset Operations</span>
                                <span className="text-white text-sm">{transaction.asset_mint_or_burn_count}</span>
                            </div>
                        </div>
                    </div>

                    {/* Assets Section */}
                    <div>
                        <h4 className="text-white text-base mb-3">Assets</h4>

                        <div className="bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] overflow-hidden">
                            <table className="w-full text-white">
                                <thead className="bg-[#151515] border-b border-[#2A2A2A]">
                                    <tr>
                                        <th className="text-left p-2 text-white/70 text-sm font-normal">Asset</th>
                                        <th className="text-right p-2 text-white/70 text-sm font-normal">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transaction.output_amount.map((asset, index) => (
                                        <tr key={index} className={index > 0 ? "border-t border-[#2A2A2A]" : ""}>
                                            <td className="p-2">
                                                {asset.unit === 'lovelace' ? (
                                                    <span className="text-[#00FFB3]">ADA</span>
                                                ) : (
                                                    <span className="text-[#5772FD] text-sm truncate block max-w-[200px]">
                                                        {formatAssetName(asset.unit)}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-2 text-right">
                                                {asset.unit === 'lovelace'
                                                    ? `${(parseInt(asset.quantity) / 1000000).toFixed(6)} ₳`
                                                    : asset.quantity}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="py-3 px-4 border-t border-[#2A2A2A] flex justify-center">
                    <button
                        onClick={handleViewOnExplorer}
                        className="py-1.5 px-3 bg-[#2A2A2A] hover:bg-[#333] rounded-md text-white flex items-center gap-2 text-sm"
                    >
                        <span>View on Explorer</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15 3H21V9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 14L21 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}; 