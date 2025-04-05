import React, { createContext, useContext, useState } from 'react';
import { axiosInstance } from '../api/axios';
import { IGeneratePrivateKeyResponse, IGenerateSeedPhraseResponse } from '../types/api';

interface WalletContextType {
    privateKey: string;
    seedPhrase: string;
    address: string;
    publicKeyHash: string;
    handleGeneratePrivateKey: () => Promise<boolean>;
    handleGenerateSeedPhrase: () => Promise<boolean>;
    handlePrivateKeyConnect: (privateKey: string) => Promise<boolean>;
    handleSeedPhraseConnect: (seedPhrase: string) => Promise<boolean>;
    setPrivateKey: (value: string) => void;
    setSeedPhrase: (value: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
    const [privateKey, setPrivateKey] = useState<string>("");
    const [seedPhrase, setSeedPhrase] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [publicKeyHash, setPublicKeyHash] = useState<string>("");

    const handleGeneratePrivateKey = async () => {
        const resp = await axiosInstance.post<IGeneratePrivateKeyResponse>("/wallet/private-key");
        const json = resp.data;
        setPrivateKey(json.data.privateKey);
        return json.code === 201;
    }

    const handleGenerateSeedPhrase = async () => {
        const resp = await axiosInstance.post<IGenerateSeedPhraseResponse>("/wallet/seed-phrase");
        const json = resp.data;
        setSeedPhrase(json.data.seedPhrase);
        return json.code === 201;
    }

    const handlePrivateKeyConnect = async (privateKey: string) => {
        const resp = await axiosInstance.post("/wallet/connect-private-key", { privateKey });
        const json = resp.data;
        setAddress(json.data.address);
        if (json.code === 201) {
            const pubKeyResp = await axiosInstance.get(`/wallet/pub-key-hash?address=${json.data.address}`);
            setPublicKeyHash(pubKeyResp.data.data.pubKeyHash);
        }
        return json.code === 201;
    }

    const handleSeedPhraseConnect = async (seedPhrase: string) => {
        const resp = await axiosInstance.post("/wallet/connect-seed-phrase", { seedPhrase });
        const json = resp.data;
        setAddress(json.data.address);
        if (json.code === 201) {
            const pubKeyResp = await axiosInstance.get(`/wallet/pub-key-hash?address=${json.data.address}`);
            setPublicKeyHash(pubKeyResp.data.data.pubKeyHash);
        }
        return json.code === 201;
    }

    return (
        <WalletContext.Provider value={{
            privateKey,
            seedPhrase,
            address,
            publicKeyHash,
            handleGeneratePrivateKey,
            handleGenerateSeedPhrase,
            handlePrivateKeyConnect,
            handleSeedPhraseConnect,
            setPrivateKey,
            setSeedPhrase
        }}>
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
} 