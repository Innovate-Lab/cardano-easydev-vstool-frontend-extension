import React from 'react'
import { MainContainer } from '../components/MainContainer'
import { GlassCard } from '../components/GlassCard'
import { CopyButton } from '../components/CopyButton'
import { CheckboxButton } from '../components/CheckboxButton'
import { useNavigate } from 'react-router-dom'
import { BackIcon } from '../components/icons/BackIcon'
import { motion } from 'framer-motion'
import { Back } from '../components/Back'

export const UserWallet = () => {
    const navigate = useNavigate();

    return (
        <MainContainer>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <GlassCard>
                    <Back title="Wallet" onClick={() => navigate("/")} />
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
                            >
                                Generate private key
                            </motion.button>
                            <motion.button
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
                                            type="password"
                                            disabled
                                            value="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx..."
                                            className="w-full h-[48px] bg-[rgba(92,92,92,0.27)] rounded-[12px] border border-[rgba(255,255,255,0.21)] px-[16px] text-white/50 text-[16px]"
                                        />
                                    </div>
                                    <CopyButton />
                                </div>
                                <div className="flex items-center gap-[12px]">
                                    <span className="text-[20px] font-normal text-white whitespace-nowrap min-w-[120px]">
                                        Seed phrase
                                    </span>
                                    <div className="flex-1 relative">
                                        <input
                                            type="password"
                                            disabled
                                            value="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx..."
                                            className="w-full h-[48px] bg-[rgba(92,92,92,0.27)] rounded-[12px] border border-[rgba(255,255,255,0.21)] px-[16px] text-white/50 text-[16px]"
                                        />
                                    </div>
                                    <CopyButton />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <div className="w-[3px] h-[42px] shrink-0 rounded-[6px] absolute top-[417.5px] left-[566px] z-[45]" />
                </GlassCard>
            </motion.div>
        </MainContainer>
    )
}
