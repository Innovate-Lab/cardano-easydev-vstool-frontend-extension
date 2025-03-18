import React, { useState, useEffect } from 'react'
import { MainContainer } from '../components/MainContainer'
import { GlassCard } from '../components/GlassCard'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Back } from '../components/Back'
import { GenerateWallet } from '../components/GenerateWallet'
import { axiosInstance } from '../api/axios'
import { NotifyCard } from '../components/NotifyCard'
import { IGeneratePrivateKeyResponse, IGenerateSeedPhraseResponse } from '../types/api'
import { NFTList } from '../components/NFTList'
import { NFT } from '../components/NFTCard'
import { UTXOList } from '../components/UTXOList'
import { UTXO } from '../components/UTXOCard'

export const UserWallet = () => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [privateKey, setPrivateKey] = useState<string>("");
    const [seedPhrase, setSeedPhrase] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [nfts, setNfts] = useState<Array<NFT>>([]);
    const [utxos, setUtxos] = useState<Array<UTXO>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGeneratePrivateKey = async () => {
        const resp = await axiosInstance.post<IGeneratePrivateKeyResponse>("/wallet/private-key")

        const json = resp.data

        setPrivateKey(json.data.privateKey)
        setIsSuccess(json.code === 201)
    }


    const handleGenerateSeedPhrase = async () => {
        const resp = await axiosInstance.post<IGenerateSeedPhraseResponse>("/wallet/seed-phrase")

        const json = resp.data

        setSeedPhrase(json.data.seedPhrase)
        setIsSuccess(json.code === 201)
    }

    useEffect(() => {
        let mounted = true;

        const fetchNFTs = async () => {
            if (!address || !mounted) return;

            try {
                setIsLoading(true);
                const response = await axiosInstance.get(`/wallet/nfts?address=${address}`);
                if (mounted) {
                    setNfts(response.data.data.nfts);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Failed to fetch NFTs:', error);
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchNFTs();

        // Cleanup function
        return () => {
            mounted = false;
        };
    }, [address]); // Only re-run when address changes

    useEffect(() => {
        let mounted = true;

        const fetchUTXOs = async () => {
            if (!address || !mounted) return;

            try {
                const response = await axiosInstance.get(`/wallet/utxos?address=${address}`);
                if (mounted) {
                    setUtxos(response.data.data.utxos);
                }
            } catch (error) {
                console.error('Failed to fetch UTXOs:', error);
            }
        };

        fetchUTXOs();

        return () => {
            mounted = false;
        };
    }, [address]);

    const handlePrivateKeyConnect = async (privateKey: string) => {
        const resp = await axiosInstance.post("/wallet/connect-private-key", { privateKey });
        const json = resp.data;
        setIsSuccess(json.code === 201);
        setAddress(json.data.address);
    }

    const handleSeedPhraseConnect = async (seedPhrase: string) => {
        const resp = await axiosInstance.post("/wallet/connect-seed-phrase", { seedPhrase });
        const json = resp.data;
        setIsSuccess(json.code === 201);
        setAddress(json.data.address);
    }

    return (
        <MainContainer>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <GlassCard>
                    <Back title="Wallet" onClick={() => navigate("/")} />
                    <GenerateWallet handleGeneratePrivateKey={handleGeneratePrivateKey} handleGenerateSeedPhrase={handleGenerateSeedPhrase} privateKey={privateKey} seedPhrase={seedPhrase} setPrivateKey={setPrivateKey} setSeedPhrase={setSeedPhrase} />

                    <div className="flex flex-col gap-[40px] w-full mt-[40px]">
                        {address && (
                            <div className="flex flex-col gap-[12px]">
                                <span className="text-white text-[16px] font-['PP_Mori']">Wallet Address</span>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={address}
                                        readOnly
                                        className="w-full h-[48px] bg-[rgba(92,92,92,0.27)] rounded-[12px] border border-[rgba(255,255,255,0.21)] px-[16px] text-white/50 text-[16px] pr-[48px]"
                                    />
                                    <button
                                        onClick={() => navigator.clipboard.writeText(address)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col gap-[12px]">
                            <span className="text-white text-[16px] font-['PP_Mori']">Private key</span>
                            <motion.button
                                onClick={() => handlePrivateKeyConnect(privateKey)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full h-[48px] bg-[#00A19B] rounded-[12px] text-white text-[20px] font-['PP_Mori'] border-none"
                            >
                                Connect with Private Key
                            </motion.button>
                        </div>

                        <div className="flex flex-col gap-[12px]">
                            <span className="text-white text-[16px] font-['PP_Mori']">Seed phrase</span>
                            <motion.button
                                onClick={() => handleSeedPhraseConnect(seedPhrase)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full h-[48px] bg-white rounded-[12px] text-black text-[20px] font-['PP_Mori'] border-none"
                            >
                                Connect with Seed Phrase
                            </motion.button>
                        </div>
                    </div>

                    {address && (
                        <>
                            {/* Wallet Assets Section */}
                            <div className="flex flex-col gap-6 mt-8">
                                {/* Section Header */}
                                <div className="flex items-center gap-2">
                                    <span className="text-white text-[24px] font-['PP_Mori'] font-semibold">
                                        Wallet Assets
                                    </span>
                                </div>

                                {/* UTXO List */}
                                <UTXOList utxos={utxos} />
                            </div>

                            {/* NFT Collection Section */}
                            <div className="flex flex-col gap-6 mt-8">
                                {/* Section Header */}
                                <div className="flex items-center gap-2">
                                    <span className="text-white text-[24px] font-['PP_Mori'] font-semibold">
                                        NFT Collection
                                    </span>
                                </div>

                                {/* NFT List */}
                                {isLoading ? (
                                    <div className="text-center text-white/50 text-[16px] font-['PP_Mori']">
                                        Loading NFTs...
                                    </div>
                                ) : (
                                    <NFTList nfts={nfts} />
                                )}
                            </div>
                        </>
                    )}

                    {isSuccess && (
                        <NotifyCard
                            type="success"
                            title="Operation Successful"
                            message="Your action has been completed successfully."
                            onClose={() => { setIsSuccess(false) }}
                        />
                    )}
                </GlassCard>
            </motion.div>
        </MainContainer>
    )
}
