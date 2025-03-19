import React from 'react';

interface NFTMetadata {
    name: string;
    image: string;
    mediaType: string;
    description: string;
}

interface AssetDetails {
    policy_id: string;
    asset_name: string;
    fingerprint: string;
    onchain_metadata: NFTMetadata;
}

export interface NFT {
    unit: string;
    quantity: string;
    assetDetails: AssetDetails;
}

interface NFTCardProps {
    nft: NFT;
}

export const NFTCard = ({ nft }: NFTCardProps) => {
    return (
        <div
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700"
        >
            {/* NFT Image */}
            <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                <img
                    src={nft.assetDetails.onchain_metadata.image}
                    alt={nft.assetDetails.onchain_metadata.name}
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            {/* NFT Details */}
            <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2">
                    {nft.assetDetails.onchain_metadata.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                    {nft.assetDetails.onchain_metadata.description}
                </p>

                {/* Technical Details */}
                <div className="space-y-2 text-sm">
                    <p className="text-gray-400">
                        <span className="font-semibold">Policy ID:</span>
                        <span className="ml-2 text-gray-500 break-all">
                            {nft.assetDetails.policy_id}
                        </span>
                    </p>
                    <p className="text-gray-400">
                        <span className="font-semibold">Fingerprint:</span>
                        <span className="ml-2 text-gray-500">
                            {nft.assetDetails.fingerprint}
                        </span>
                    </p>
                    <p className="text-gray-400">
                        <span className="font-semibold">Quantity:</span>
                        <span className="ml-2 text-gray-500">{nft.quantity}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}; 