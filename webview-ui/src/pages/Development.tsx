import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import { MainContainer } from '../components/MainContainer'
import { GlassCard } from '../components/GlassCard'
import { Back } from '../components/Back'
import { SelectField } from '../components/SelectField'
import { messageHandler } from '@estruyf/vscode/dist/client'

export const Development = () => {
    const navigate = useNavigate();
    const [projectPath, setProjectPath] = useState<string>("");
    const [blockchainProviderKey, setBlockchainProviderKey] = useState<string>("");

    const handleBuild = async () => {
        await messageHandler.request<string>("BUILD", projectPath);
    };

    const handleTest = async () => {
        await messageHandler.request<string>("TEST", projectPath);
    };

    const handleSelectFolder = async () => {
        try {
            const selectedPath = await messageHandler.request<string>("SELECT_FOLDER");
            if (selectedPath) {
                setProjectPath(selectedPath);
            }
        } catch (error) {
            console.error('Failed to select folder:', error);
        }
    };

    return (
        <MainContainer>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >

            </motion.div>
            <GlassCard>
                <Back title="Development" onClick={() => navigate("/")} />
                <div className="flex flex-col gap-[40px] items-start self-stretch shrink-0 flex-nowrap relative z-[3]">
                    <SelectField
                        label="Network"
                        value="preview"
                        options={[
                            { value: 'preview', label: 'Preview' },
                            { value: 'preprod', label: 'Preprod' },
                            { value: 'mainnet', label: 'Mainnet' },
                        ]}
                        onChange={() => { }}
                        className="w-full"
                    />
                    <div className="flex flex-col gap-[12px] justify-center items-start w-full relative z-[8]">
                        <span className="h-[11px] w-full font-['PP_Mori'] text-[16px] font-semibold leading-[11px] text-[#fff] relative text-left whitespace-nowrap z-[9]">
                            Blockchain Provider Key
                        </span>
                        <div className="w-full relative">
                            <input
                                type="text"
                                value={blockchainProviderKey}
                                onChange={(e) => setBlockchainProviderKey(e.target.value)}
                                className="w-full h-[48px] bg-[rgba(92,92,92,0.27)] rounded-[12px] border border-[rgba(255,255,255,0.21)] px-[16px] text-white/50 text-[16px]"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 w-full">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-white text-base font-semibold">
                                        Project Location
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={projectPath}
                                            readOnly
                                            className="flex-1 h-[48px] bg-[rgba(92,92,92,0.27)] rounded-[12px] border border-[rgba(255,255,255,0.21)] px-[16px] text-white/50 text-[16px]"
                                            placeholder="Select project location"
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleSelectFolder}
                                            className="h-[48px] px-4 bg-[#00A19B] rounded-[12px] text-white text-[16px] font-['PP_Mori'] border-none whitespace-nowrap"
                                        >
                                            Browse
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[15]">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full h-[48px] bg-[#00A19B] rounded-[12px] text-white text-[20px] font-['PP_Mori'] border-none"
                            onClick={handleBuild}
                        >
                            Build
                        </motion.button>
                        <motion.button
                            onClick={handleTest}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full h-[48px] bg-white rounded-[12px] text-black text-[20px] font-['PP_Mori'] border-none"
                        >
                            Test
                        </motion.button>
                    </div>
                </div>
            </GlassCard>
        </MainContainer>
    )
}
