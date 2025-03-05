import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-auto py-6 text-center bg-white/10 backdrop-blur-sm">
            <div className="container mx-auto">
                <p className="text-white/80">© 2025 Cardano dApp Template. Built with Lucid & Aiken</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="https://github.com/your-repo" className="text-white/80 hover:text-white">
                        GitHub
                    </a>
                    <a href="https://docs.cardano.org" className="text-white/80 hover:text-white">
                        Docs
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 