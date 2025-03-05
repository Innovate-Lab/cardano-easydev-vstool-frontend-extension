import React from 'react';
import InfoCard from '../components/Cards/InfoCard';
import WalletButton from '../components/WalletConnect/WalletButton';

const Home = () => {
    return (
        <div className="space-y-12">
            <section className="text-center py-20">
                <h1 className="reveal text-5xl font-bold text-white mb-6 tracking-tight">
                    Welcome to Cardano dApp Template
                </h1>
                <p className="reveal text-xl text-white/80 mb-8 max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
                    Build your next Cardano project with Lucid & Aiken
                </p>
                <div className="reveal" style={{ animationDelay: '0.3s' }}>
                    <WalletButton />
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="reveal" style={{ animationDelay: '0.4s' }}>
                    <InfoCard title="ADA Price" value="$0.00" />
                </div>
                <div className="reveal" style={{ animationDelay: '0.5s' }}>
                    <InfoCard title="Network" value="Preprod" />
                </div>
                <div className="reveal" style={{ animationDelay: '0.6s' }}>
                    <InfoCard title="Transactions" value="0" />
                </div>
            </section>
        </div>
    );
};

export default Home; 