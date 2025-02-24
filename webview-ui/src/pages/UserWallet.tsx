import React from 'react'
import { MainContainer } from '../components/MainContainer'
import { GlassCard } from '../components/GlassCard'
import { CopyButton } from '../components/CopyButton'
import { CheckboxButton } from '../components/CheckboxButton'
import { useNavigate } from 'react-router-dom'
import { BackIcon } from '../components/icons/BackIcon'

export const UserWallet = () => {
    const navigate = useNavigate();
    
    return (
        <MainContainer>
            <GlassCard>
                <div className="flex items-center gap-[11px]">
                    <BackIcon onClick={() => navigate("/")} />
                    <span className="font-['PP_Mori'] text-[16px] font-normal text-white">Wallet</span>
                </div>
                <div className="flex flex-col gap-[40px] w-full">
                    <div className="flex flex-col gap-[16px]">
                        <button className="w-full h-[48px] bg-[#00A19B] rounded-[12px] text-white text-[20px] font-['PP_Mori'] border-none">
                            Generate private key
                        </button>
                        <button className="w-full h-[48px] bg-white rounded-[12px] text-black text-[20px] font-['PP_Mori'] border-none">
                            Generate seed phrase
                        </button>
                    </div>
                    <div className="flex flex-col gap-[32px] w-full">
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
                    </div>
                </div>
                <div className="w-[3px] h-[42px] shrink-0 rounded-[6px] absolute top-[417.5px] left-[566px] z-[45]" />
            </GlassCard>
        </MainContainer>
    )
}
