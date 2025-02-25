import React, { useState } from 'react'
import { MainContainer } from '../components/MainContainer'
import { GlassCard } from '../components/GlassCard'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Back } from '../components/Back'
import { GenerateWallet } from '../components/GenerateWallet'
import { axiosInstance } from '../api/axios'
import { NotifyCard } from '../components/NotifyCard'
import { IGeneratePrivateKeyResponse, IGenerateSeedPhraseResponse } from '../types/api'

export const UserWallet = () => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [privateKey, setPrivateKey] = useState<string>("");
    const [seedPhrase, setSeedPhrase] = useState<string>("");

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

    return (
        <MainContainer>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <GlassCard>
                    <Back title="Wallet" onClick={() => navigate("/")} />
                    <GenerateWallet handleGeneratePrivateKey={handleGeneratePrivateKey} handleGenerateSeedPhrase={handleGenerateSeedPhrase} privateKey={privateKey} seedPhrase={seedPhrase} />
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
