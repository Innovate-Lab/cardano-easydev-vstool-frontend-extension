import React, { useEffect, useState } from 'react'
import { UTxO, Assets } from 'lucid-cardano';

interface UtXOsProps {
    unitsQuantity: { [key: string]: bigint };
    setUnitsQuantity: (unitsQuantity: { [key: string]: bigint }) => void;
}

export const UtXOs: React.FC<UtXOsProps> = ({ unitsQuantity, setUnitsQuantity }) => {
    const [utxos, setUtxos] = useState<UTxO[]>([]);

    const [selectedAssets, setSelectedAssets] = useState<{ [key: string]: boolean }>({});

    const [combinedAssets, setCombinedAssets] = useState<{ [key: string]: bigint }>({});

    useEffect(() => {
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

    // useEffect(() => {
    //     async function fetchUtxos() {
    //         if (!address) return;
    //         const utxos = await getUTxOs(address);
    //         console.log(utxos);
    //         setUtxos(utxos);
    //     }
    //     fetchUtxos();
    // }, [lucid, address]);

    // const handleQuantityChange = (assetId: string, value: string) => {
    //     // Handle empty or invalid input
    //     const newValue = value === '' ? 0n : BigInt(Math.max(0, parseInt(value) || 0));
    //     setUnitsQuantity(prev => ({
    //         ...prev,
    //         [assetId]: newValue
    //     }));
    // };

    const handleAssetSelection = (assetId: string) => {
        setSelectedAssets(prev => ({
            ...prev,
            [assetId]: !prev[assetId]
        }));
    };

    return (
        <div>
            <h3 className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                UTxOs Selection
            </h3>
            <div className="space-y-4">
                {Object.entries(combinedAssets).map(([assetId, totalAmount]) => (
                    <div key={assetId} className="p-4 border rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <input
                                type="checkbox"
                                checked={selectedAssets[assetId] || false}
                                onChange={() => handleAssetSelection(assetId)}
                                className="w-4 h-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500/20 
                                         transition-all duration-300 cursor-pointer hover:border-blue-400"
                            />
                            <span className="text-sm text-gray-300">{assetId}: {totalAmount.toString()}</span>
                            {selectedAssets[assetId] && (
                                <input
                                    type="number"
                                    value={unitsQuantity[assetId]?.toString() || '0'}
                                    // onChange={(e) => handleQuantityChange(assetId, e.target.value)}
                                    className="border rounded px-2 py-1 w-32 bg-gray-700 text-gray-200 
                                             border-gray-600 focus:border-blue-500 focus:ring-2 
                                             focus:ring-blue-500/20 transition-all duration-300"
                                    placeholder="Enter quantity"
                                    min="0"
                                    max={totalAmount.toString()}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
