import React from 'react';
import { useLucid } from '../../context/LucidProvider';

const WalletButton = () => {
    const { connectWallet, address } = useLucid();

    return (
        <>
            {address ? (
                <div className="bg-white/10 text-white px-6 py-2.5 rounded-full font-medium border border-white/20 hover:bg-white/20 transition-all duration-200">
                    {address.slice(0, 6)}...{address.slice(-4)}
                </div>
            ) : (
                <button
                    className="button-glow px-6 py-2.5 rounded-full bg-purple-600 text-white font-medium"
                    onClick={connectWallet}
                >
                    Connect Wallet
                </button>
            )}
        </>
    );
};

export default WalletButton; 