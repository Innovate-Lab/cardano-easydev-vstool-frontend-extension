import React, { useEffect, useState } from 'react'
import { UTxO, Assets } from 'lucid-cardano';
import { axiosInstance } from '../api/axios';

interface UTXOsProps {
    unitsQuantity: { [key: string]: bigint };
    setUnitsQuantity: (unitsQuantity: { [key: string]: bigint }) => void;
}

export const UTXOs: React.FC<UTXOsProps> = ({ unitsQuantity, setUnitsQuantity }) => {
    const [utxos, setUtxos] = useState<UTxO[]>([]);

    const [selectedAssets, setSelectedAssets] = useState<{ [key: string]: boolean }>({});

    const [combinedAssets, setCombinedAssets] = useState<{ [key: string]: bigint }>({});

    useEffect(() => {
        if (utxos.length === 0) return;

        // Combine assets whenever utxos change
        const combined = utxos.reduce((acc, utxo) => {
            Object.entries(utxo.assets).forEach(([assetId, amount]) => {
                acc[assetId] = (acc[assetId] || 0n) + amount;
            });
            return acc;
        }, {} as { [key: string]: bigint });

        setCombinedAssets(combined);

        // Initialize selection state for new assets
        const initialSelection = Object.keys(combined).reduce((acc, assetId) => {
            acc[assetId] = false;
            return acc;
        }, {} as { [key: string]: boolean });
        setSelectedAssets(initialSelection);
    }, [utxos]);

    useEffect(() => {
        async function fetchUtxos() {
            const address = "addr_test1qr7xvrx6zea988hz5juazw32qyfmh5jg6z9euursqs390pz62landnfc3ggslmdvaglwmuquuxt2pkkxctzp0adfrxasyzm9m9";
            const data = await axiosInstance.get<{ data: { utxos: UTxO[] } }>(`/wallet/utxos-lucid?address=${address}`);
            console.log(data.data.data.utxos);
            // Convert amounts from number to bigint in UTXOs
            if (data.data.data.utxos && Array.isArray(data.data.data.utxos)) {
                // Create a deep copy of UTXOs and ensure all asset amounts are BigInt
                const processedUtxos = data.data.data.utxos.map(utxo => {
                    const processedAssets: Assets = {};

                    // Convert each asset amount to BigInt if it's not already
                    Object.entries(utxo.assets).forEach(([assetId, amount]) => {
                        // Check if amount is already a BigInt
                        if (typeof amount === 'bigint') {
                            processedAssets[assetId] = amount;
                        } else {
                            // Convert number or string to BigInt
                            processedAssets[assetId] = BigInt(amount.toString());
                        }
                    });

                    return {
                        ...utxo,
                        assets: processedAssets
                    };
                });

                setUtxos(processedUtxos);
            }

        }
        fetchUtxos();
    }, []);

    const handleQuantityChange = (assetId: string, value: string) => {
        // Handle empty or invalid input
        const newValue = value === '' ? 0n : BigInt(Math.max(0, parseInt(value) || 0));
        setUnitsQuantity(prev => ({
            ...prev,
            [assetId]: newValue
        }));
    };

    const handleAssetSelection = (assetId: string) => {
        setSelectedAssets(prev => ({
            ...prev,
            [assetId]: !prev[assetId]
        }));
    };

    return (
        <div className="flex flex-col gap-4 max-w-full">
            <h3 className="text-lg font-semibold text-[#00FFB2]">
                UTxOs Selection
            </h3>
            <div className="space-y-3">
                {Object.entries(combinedAssets).map(([assetId, totalAmount]) => (
                    <div
                        key={assetId}
                        className="bg-[rgba(92,92,92,0.27)] rounded-[8px] border border-[rgba(255,255,255,0.21)] hover:bg-[rgba(92,92,92,0.35)] transition-all duration-300"
                    >
                        <div className="flex items-center gap-3 p-3">
                            <input
                                type="checkbox"
                                checked={selectedAssets[assetId] || false}
                                onChange={() => handleAssetSelection(assetId)}
                                className="w-4 h-4 rounded-sm border-gray-600 text-[#00FFB2] 
                                         focus:ring-[#00FFB2]/20 transition-all duration-300 
                                         cursor-pointer hover:border-[#00FFB2]"
                            />
                            <div className="flex flex-col min-w-0 flex-1">
                                <span className="text-white text-sm font-['PP_Mori'] truncate">
                                    {assetId === 'lovelace' ? 'ADA' : assetId}
                                </span>
                                <span className="text-[#6C6C6C] text-xs font-['PP_Mori']">
                                    Available: {totalAmount.toString()}
                                </span>
                            </div>
                            {selectedAssets[assetId] && (
                                <div className="flex-shrink-0">
                                    <input
                                        type="number"
                                        value={unitsQuantity[assetId]?.toString() || '0'}
                                        onChange={(e) => handleQuantityChange(assetId, e.target.value)}
                                        className="w-24 px-2 py-1 bg-[rgba(92,92,92,0.27)] text-white 
                                                 rounded-[8px] border border-[rgba(255,255,255,0.21)]
                                                 focus:border-[#00FFB2] focus:ring-1 focus:ring-[#00FFB2]/20 
                                                 transition-all duration-300 text-sm font-['PP_Mori']"
                                        placeholder="Amount"
                                        min="0"
                                        max={totalAmount.toString()}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
