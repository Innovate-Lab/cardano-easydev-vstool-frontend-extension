import React from 'react'
import { motion } from 'framer-motion'

import { MainContainer } from '../components/MainContainer'
import { GlassCard } from '../components/GlassCard'
import { AssetButton } from '../components/AssetButton'
import { InputField } from '../components/InputField'
import { CopyButton } from '../components/CopyButton'
import { Back } from '../components/Back'
import { useNavigate } from 'react-router-dom'
import { AssetToggleButton } from '../components/AssetToggleButton'
import { ChooseValidatorButton } from '../components/ChooseValidatorButton'
import { usePlutus } from '../context/PlutusProvider'
import { resolveAllRefs } from '../utils/plutusSchema'

export const Simulation = () => {
    const navigate = useNavigate();

    const { plutusSchema, setPlutusSchema, setCurrentValidatorIndex, currentValidatorIndex } = usePlutus();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const json = JSON.parse(e.target?.result as string);
                    setPlutusSchema(json);
                    console.log(json);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    // You might want to add error handling UI here
                }
            };
            reader.readAsText(file);
        }
    };

    const resolvedValidators = plutusSchema?.validators.map(validator => {
        return {
            ...validator,
            datum: resolveAllRefs(validator.datum, plutusSchema),
            redeemer: resolveAllRefs(validator.redeemer, plutusSchema)
        };
    });

    console.log(resolvedValidators);

    return (
        <MainContainer>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[583px] mx-auto"
            >
                <GlassCard>
                    <Back title="Simulation" onClick={() => navigate("/")} />
                    <div className="flex flex-col gap-[40px] items-start self-stretch shrink-0 flex-nowrap relative z-[3]">
                        <div className="flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[4]">
                            <div className="flex flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[5]">
                                <label
                                    htmlFor="fileInput"
                                    className="flex h-[175px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] flex-col gap-[16px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0.1)] rounded-[12px] border-solid border border-[rgba(157,157,157,0.21)] relative z-[6] cursor-pointer hover:bg-[rgba(255,255,255,0.15)] transition-colors"
                                >
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept=".json"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                    <div className="w-[31px] h-[31px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-12/a9a90d49-f461-48cc-a541-cef6d4ccba26.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[7]" />
                                    <div className="flex w-[152px] flex-col gap-[8px] items-center shrink-0 flex-nowrap relative z-[8]">
                                        <div className="flex w-[152px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[9]">
                                            <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-normal leading-[11px] text-[rgba(255,255,255,0.7)] relative text-left whitespace-nowrap z-10">
                                                Upload Plutus JSON
                                            </span>
                                        </div>
                                        <span className="h-[10px] shrink-0 basis-auto font-['PP_Mori'] text-[14px] font-semibold leading-[10px] text-[#00ffb2] relative text-left whitespace-nowrap z-[11]">
                                            Click here to browse
                                        </span>
                                    </div>
                                </label>
                            </div>
                            <div className="flex w-[258px] gap-[8px] items-start shrink-0 flex-nowrap relative z-[12]">
                                <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-normal leading-[11px] text-[rgba(255,255,255,0.7)] relative text-left whitespace-nowrap z-10 mb-4">
                                    Available Validators
                                </span>
                                {resolvedValidators?.map((validator, index) => (
                                    <div key={validator.title}>
                                        <h3 className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-normal leading-[11px] text-[rgba(255,255,255,0.7)] hover:text-[#00ffb2] transition-colors cursor-pointer relative text-left whitespace-nowrap z-10">
                                            {validator.title}
                                        </h3>
                                    </div>
                                ))}
                                {resolvedValidators?.map((validator, index) => (
                                    <div key={validator.title} onClick={() => setCurrentValidatorIndex(index)}>
                                        {currentValidatorIndex === index && (
                                            <>
                                                <h3 className="text-xl font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                                                    {validator.title}
                                                </h3>
                                                {/* <ContractFields setData={setData} />
                                                <UtXOs
                                                    unitsQuantity={unitsQuantity}
                                                    setUnitsQuantity={setUnitsQuantity}
                                                /> */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // handleTransaction();
                                                    }}
                                                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                                                >
                                                    Execute Transaction
                                                </button>
                                                {/* {txHash && (
                                                    <div className="mt-4">
                                                        <a
                                                            href={`https://preprod.cardanoscan.io/transaction/${txHash}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-400 hover:text-blue-300 underline"
                                                        >
                                                            View transaction on Explorer
                                                        </a>
                                                    </div>
                                                )} */}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex w-[321px] items-start shrink-0 flex-nowrap bg-[#04242b] rounded-[12px] relative z-[21]">
                                <AssetToggleButton
                                    type="lock"
                                    isActive={true}
                                />
                                <AssetToggleButton
                                    type="unlock"
                                    isActive={false}
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-[12px] w-full">
                            <span className="text-[20px] font-normal text-white whitespace-nowrap min-w-[120px]">
                                Contract Address
                            </span>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={""}
                                    className="w-full h-[48px] bg-[rgba(92,92,92,0.27)] rounded-[12px] border border-[rgba(255,255,255,0.21)] px-[16px] text-white/50 text-[16px] md:h-[56px] md:text-[18px] lg:h-[64px] lg:text-[20px] focus:outline-none focus:ring-2 focus:ring-[#00A19B] transition duration-200"
                                />
                            </div>
                            <CopyButton text={""} />
                        </div>
                        <div className="flex flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[38]">
                            <span className="h-[15px] shrink-0 basis-auto font-['PP_Mori'] text-[22px] font-semibold leading-[15px] text-[#fff] relative text-left whitespace-nowrap z-[39]">
                                Datum
                            </span>
                            <div className="flex h-[34px] gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-40">
                                <div className="flex w-[69px] flex-col gap-[8px] justify-center items-start shrink-0 flex-nowrap relative z-[41]">
                                    <span className="h-[10px] shrink-0 basis-auto font-['PP_Mori'] text-[14px] font-semibold leading-[10px] text-[#00ffb2] relative text-left whitespace-nowrap z-[42]">
                                        Bytes
                                    </span>
                                    <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-semibold leading-[11px] text-[#fff] relative text-left whitespace-nowrap z-[43]">
                                        Owner
                                    </span>
                                </div>
                                <div className="flex h-[34px] pt-[24px] pr-[8px] pb-[24px] pl-[8px] gap-[10px] items-center grow shrink-0 basis-0 flex-nowrap bg-[rgba(92,92,92,0.27)] rounded-[8px] border-solid border border-[rgba(255,255,255,0.21)] relative z-[44]">
                                    <div className="flex gap-[8px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[45]">
                                        <span className="h-[11px] grow shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-normal leading-[11px] text-[#fff] relative text-left overflow-hidden whitespace-nowrap z-[46]">
                                            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap relative z-[47]">
                            <span className="h-[15px] shrink-0 basis-auto font-['PP_Mori'] text-[22px] font-semibold leading-[15px] text-[#fff] relative text-left whitespace-nowrap z-[48]">
                                UTxOs Selection
                            </span>
                            <div className="flex h-[34px] gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[49]">
                                <div className="flex w-[122px] flex-col gap-[8px] justify-center items-start shrink-0 flex-nowrap relative z-50">
                                    <span className="h-[10px] shrink-0 basis-auto font-['PP_Mori'] text-[14px] font-semibold leading-[10px] text-[#00ffb2] relative text-left whitespace-nowrap z-[51]">
                                        lovelace
                                    </span>
                                    <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-semibold leading-[11px] text-[#fff] relative text-left whitespace-nowrap z-[52]">
                                        999000000000
                                    </span>
                                </div>
                                <div className="flex w-[53px] h-[34px] pt-[24px] pr-[8px] pb-[24px] pl-[8px] gap-[10px] items-center shrink-0 flex-nowrap bg-[rgba(92,92,92,0.27)] rounded-[8px] border-solid border border-[rgba(255,255,255,0.21)] relative z-[53]">
                                    <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-normal leading-[11px] text-[#fff] relative text-left overflow-hidden whitespace-nowrap z-[54]">
                                        1000
                                    </span>
                                </div>
                                <div className="w-[24px] h-[24px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-12/dd70fdd9-1dc0-40d6-93a5-6f31fe7259f8.svg)] bg-cover bg-no-repeat relative overflow-hidden z-[55]" />
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full h-[48px] bg-[#00A19B] rounded-[12px] text-white text-[20px] font-['PP_Mori'] border-none"
                            onClick={() => { }}
                        >
                            Execute transaction
                        </motion.button>
                    </div>
                    <div className="w-[3px] h-[42px] shrink-0 rounded-[6px] absolute top-[417.5px] left-[566px] z-[60]" />
                </GlassCard>
            </motion.div>
        </MainContainer>
    )
}
