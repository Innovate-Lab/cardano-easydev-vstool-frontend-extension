import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { MainContainer } from '../components/MainContainer'
import { GlassCard } from '../components/GlassCard'
import { CopyButton } from '../components/CopyButton'
import { Back } from '../components/Back'
import { useNavigate } from 'react-router-dom'
import { usePlutus } from '../context/PlutusProvider'
import { resolveAllRefs } from '../utils/plutusSchema'
import { axiosInstance } from '../api/axios'
import ContractFields from '../components/ContractInterface/ContractFields'
import { UTXOs } from '../components/UTXO'
import { useWallet } from '../context/WalletProvider'

export const Simulation = () => {
    const navigate = useNavigate();

    const { plutusSchema, setPlutusSchema, setCurrentValidatorIndex, currentValidatorIndex } = usePlutus();

    const { seedPhrase, privateKey } = useWallet();

    const [contractAddress, setContractAddress] = useState<string>("");
    const [isLockMode, setIsLockMode] = useState<boolean>(true);
    const [unitsQuantity, setUnitsQuantity] = useState<{ [key: string]: bigint }>({});
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [txHash, setTxHash] = useState<string | null>(null);

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
                    setError('Error parsing JSON. Please upload a valid file.');
                }
            };
            reader.readAsText(file);
        }
    };

    const handleExecuteTransaction = async () => {
        if (!plutusSchema || currentValidatorIndex === null) return;
        try {
            setIsLoading(true);
            // Convert BigInt values to strings for serialization
            const serializedUnitsQuantity = Object.entries(unitsQuantity).reduce((acc, [key, value]) => {
                acc[key] = value.toString();
                return acc;
            }, {} as Record<string, string>);

            const resp = await axiosInstance.post("/validator/execute", {
                datumOrRedeemer: data,
                contractAddress: contractAddress,
                unitsQuantity: serializedUnitsQuantity,
                seedPhrase: seedPhrase,
                isLock: isLockMode,
                validator: {
                    type: "PlutusV2",
                    script: plutusSchema?.validators[currentValidatorIndex as number].compiledCode,
                }
            });
            setTxHash(resp.data.data.txHash);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to execute transaction');
        } finally {
            setIsLoading(false);
        }
    }

    const resolvedValidators = plutusSchema?.validators.map(validator => {
        return {
            ...validator,
            datum: resolveAllRefs(validator.datum, plutusSchema),
            redeemer: resolveAllRefs(validator.redeemer, plutusSchema)
        };
    });

    useEffect(() => {
        async function getContractAddress() {
            if (!plutusSchema || currentValidatorIndex === null) return;
            const contractAddress = await axiosInstance.post("/validator/address", {
                compiledCode: plutusSchema?.validators[currentValidatorIndex as number].compiledCode
            });
            setContractAddress(contractAddress.data.data.contractAddress);
        }
        getContractAddress();
    }, [currentValidatorIndex, plutusSchema])

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
                                    className="flex h-[175px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] flex-col gap-[16px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[rgba(255,255,255,0.1)] rounded-[12px] border-2 border-dashed border-[rgba(157,157,157,0.21)] relative z-[6] cursor-pointer hover:bg-[rgba(255,255,255,0.15)] transition-all duration-300"
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
                                    {error && (
                                        <span className="text-red-500 text-sm mt-2">
                                            {error}
                                        </span>
                                    )}
                                </label>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-4">
                                {resolvedValidators?.map((validator, index) => (
                                    <button
                                        key={validator.title}
                                        onClick={() => setCurrentValidatorIndex(index)}
                                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${currentValidatorIndex === index
                                            ? 'bg-[#00A19B] text-white'
                                            : 'bg-[rgba(255,255,255,0.1)] text-white/70 hover:bg-[rgba(255,255,255,0.2)]'
                                            }`}
                                    >
                                        {validator.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-[12px] w-full bg-[rgba(92,92,92,0.15)] p-4 rounded-lg">
                            <span className="text-[18px] font-medium text-white/80 whitespace-nowrap">
                                Contract Address
                            </span>
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    disabled={true}
                                    value={contractAddress}
                                    className="w-full h-[48px] bg-[rgba(92,92,92,0.27)] rounded-lg border border-[rgba(255,255,255,0.21)] px-4 text-white/70 font-mono text-[16px] focus:outline-none focus:ring-2 focus:ring-[#00A19B] transition duration-200"
                                />
                            </div>
                            <CopyButton text={contractAddress} />
                        </div>
                        {resolvedValidators?.map((validator, index) => (
                            <>
                                {currentValidatorIndex === index && (
                                    <div className="flex flex-col gap-[40px] items-start self-stretch shrink-0 flex-nowrap relative z-[3]">
                                        <h3 className="h-[15px] font-['PP_Mori'] text-[22px] font-semibold leading-[15px] text-[#fff]">
                                            {validator.title}
                                        </h3>
                                        <ContractFields setData={setData} isLockMode={isLockMode} setIsLockMode={setIsLockMode} />
                                        <UTXOs
                                            unitsQuantity={unitsQuantity}
                                            setUnitsQuantity={setUnitsQuantity}
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            disabled={isLoading || !data}
                                            className={`w-full h-[48px] rounded-[12px] text-white text-[18px] font-medium transition-all duration-300 ${isLoading || !data
                                                ? 'bg-[#00A19B]/50 cursor-not-allowed'
                                                : 'bg-[#00A19B] hover:bg-[#00B1AB]'
                                                }`}
                                            onClick={async () => {
                                                await handleExecuteTransaction();
                                            }}
                                        >
                                            {isLoading ? 'Processing...' : 'Execute transaction'}
                                        </motion.button>
                                        {txHash && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="w-full p-4 bg-[rgba(0,255,178,0.1)] rounded-lg border border-[#00ffb2]/20 mt-4"
                                            >
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-white/70 text-sm">Transaction Hash:</span>
                                                        <CopyButton text={txHash} />
                                                    </div>
                                                    <div className="font-mono text-sm text-white/90 break-all">
                                                        {txHash}
                                                    </div>
                                                    <a
                                                        href={`https://preprod.cardanoscan.io/transaction/${txHash}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-[#00ffb2] hover:text-[#00ffb2]/80 transition-colors mt-2"
                                                    >
                                                        <span>View on Explorer</span>
                                                        <svg
                                                            className="w-4 h-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                            />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                </GlassCard>
            </motion.div>
        </MainContainer>
    )
}
