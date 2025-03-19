import React, { useState } from 'react';
import { messageHandler } from '@estruyf/vscode/dist/client';

import { MainContainer } from '../components/MainContainer';
import { GlassCard } from '../components/GlassCard';
import { BackIcon } from '../components/icons/BackIcon';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NotifyCard } from '../components/NotifyCard';
import { SelectField } from '../components/SelectField';
import { axiosInstance } from '../api/axios';

interface ProjectMetadata {
    packageName: string;
    projectPath: string;
}

const languageOptions = [
    { value: 'aiken', label: 'Aiken' },
];

const sdkOptions = [
    { value: 'lucid', label: 'Lucid' },
];

export const CreateDapp = () => {
    const navigate = useNavigate();

    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [metadata, setMetadata] = useState<ProjectMetadata>({
        packageName: '',
        projectPath: ''
    });

    const [selectedSDK, setSelectedSDK] = useState('lucid');
    const [selectedLanguage, setSelectedLanguage] = useState('aiken');

    const handleInputChange = (field: keyof ProjectMetadata) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setMetadata(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleGenerate = async () => {
        try {
            const resp = await axiosInstance.post("/dapp-template", { metadata, offChainSDK: selectedSDK, language: selectedLanguage });

            const isSuccess = await messageHandler.request<boolean>("CREATE_TEMPLATE", { metadata, template: resp.data.data.data });

            setIsSuccess(isSuccess);
        } catch (error) {
            console.error('Failed to generate template:', error);
        }
    };

    const handleSelectFolder = async () => {
        try {
            const selectedPath = await messageHandler.request<string>("SELECT_FOLDER");
            if (selectedPath) {
                setMetadata(prev => ({
                    ...prev,
                    projectPath: selectedPath
                }));
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
                className="w-full max-w-[583px] mx-auto"
            >
                <GlassCard>
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                            <BackIcon onClick={() => navigate('/')} />
                        </div>
                        <span className="text-xl text-white font-['PP_Mori']">
                            Create dapp template
                        </span>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col gap-8 w-full">
                        {/* SDK Selection */}
                        <SelectField
                            label="Off chain interaction SDK"
                            value={selectedSDK}
                            options={sdkOptions}
                            onChange={setSelectedSDK}
                        />

                        {/* Language Selection */}
                        <SelectField
                            label="Language"
                            value={selectedLanguage}
                            options={languageOptions}
                            onChange={setSelectedLanguage}
                        />

                        {/* Project Metadata */}
                        <div className="flex flex-col gap-6">
                            <span className="text-xl font-semibold text-white">
                                Project Metadata
                            </span>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-white text-base font-semibold">
                                        Project Location
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={metadata.projectPath}
                                            readOnly
                                            className="flex-1 h-[48px] bg-[rgba(92,92,92,0.27)] rounded-[12px] border border-[rgba(255,255,255,0.21)] px-[16px] text-white/50 text-[16px]"
                                            placeholder="Select project location"
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleSelectFolder}
                                            className="h-[48px] px-6 bg-[#00A19B] rounded-[12px] text-white text-[16px] font-['PP_Mori'] border-none whitespace-nowrap"
                                        >
                                            Browse
                                        </motion.button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-white text-base font-semibold">
                                        Package Name
                                    </label>
                                    <input
                                        type="text"
                                        value={metadata.packageName}
                                        onChange={handleInputChange('packageName')}
                                        className="w-full h-[48px] bg-[rgba(92,92,92,0.27)] rounded-[12px] border border-[rgba(255,255,255,0.21)] px-[16px] text-white/50 text-[16px]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Generate Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleGenerate}
                            className="w-full h-[48px] bg-[#00A19B] rounded-[12px] text-white text-[20px] font-['PP_Mori'] border-none"
                        >
                            Generate
                        </motion.button>
                    </div>

                    {/* Success Notification */}
                    {isSuccess && (
                        <NotifyCard
                            type="success"
                            title="Operation Successful"
                            message="Your dapp template has been generated successfully."
                            onClose={() => { setIsSuccess(false) }}
                        />
                    )}
                </GlassCard>
            </motion.div>
        </MainContainer>
    );
};

export default CreateDapp;