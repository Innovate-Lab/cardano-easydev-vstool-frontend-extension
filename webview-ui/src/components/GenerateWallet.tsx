import React from 'react'
import { copyToClipboard } from '../utils';
import { CopyButton } from '../components/CopyButton'
import { motion } from 'framer-motion'

interface IGenerateWalletProps {
    handleGeneratePrivateKey: () => void;
    handleGenerateSeedPhrase: () => void;
    privateKey: string;
    seedPhrase: string;
}

export const GenerateWallet = ({ handleGeneratePrivateKey, handleGenerateSeedPhrase, privateKey, seedPhrase }: IGenerateWalletProps) => {
    return (
        <div className="flex flex-col gap-[40px] w-full">
            <motion.div
                className="flex flex-col gap-[16px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-[48px] bg-[#00A19B] rounded-[12px] text-white text-[20px] font-['PP_Mori'] border-none"
                    onClick={handleGeneratePrivateKey}
                >
                    Generate private key
                </motion.button>
                <motion.button
                    onClick={handleGenerateSeedPhrase}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-[48px] bg-white rounded-[12px] text-black text-[20px] font-['PP_Mori'] border-none"
                >
                    Generate seed phrase
                </motion.button>
            </motion.div>
            <motion.div
                className="flex flex-col gap-[32px] w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="flex flex-col gap-[24px]">
                    <div className="flex items-center gap-[12px]">
                        <span className="text-[20px] font-normal text-white whitespace-nowrap min-w-[120px]">
                            Private key
                        </span>
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={privateKey}
                                className="w-full h-[48px] bg-[rgba(92,92,92,0.27)] rounded-[12px] border border-[rgba(255,255,255,0.21)] px-[16px] text-white/50 text-[16px]"
                            />
                        </div>
                        <CopyButton text={privateKey} />
                    </div>
                    <div className="flex items-center gap-[12px]">
                        <span className="text-[20px] font-normal text-white whitespace-nowrap min-w-[120px]">
                            Seed phrase
                        </span>
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={seedPhrase}
                                className="w-full h-[48px] bg-[rgba(92,92,92,0.27)] rounded-[12px] border border-[rgba(255,255,255,0.21)] px-[16px] text-white/50 text-[16px]"
                            />
                        </div>
                        <CopyButton text={seedPhrase} />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
