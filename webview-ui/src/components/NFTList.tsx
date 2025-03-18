import React from 'react';
import { NFTCard } from './NFTCard';

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

interface NFT {
    unit: string;
    quantity: string;
    assetDetails: AssetDetails;
}

interface NFTListProps {
    nfts: Array<NFT>; // Using the same NFT type from above
}

export const NFTList = ({ nfts }: NFTListProps) => {
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Your NFTs</h2>
            {nfts.length === 0 ? (
                <p className="text-gray-400 text-center">No NFTs found</p>
            ) : (
                <div className="grid grid-cols-2 gap-3 max-w-3xl mx-auto">
                    {nfts.map((nft) => (
                        <div key={nft.unit} className="bg-gray-800 rounded-lg p-4 flex flex-col">
                            <img
                                src={nft.assetDetails.onchain_metadata.image}
                                alt={nft.assetDetails.onchain_metadata.name}
                                className="w-full h-48 object-contain bg-gray-700 rounded-md mb-3"
                            />
                            <h3 className="text-lg font-semibold text-white mb-1">{nft.assetDetails.onchain_metadata.name}</h3>
                            <p className="text-gray-400 text-sm mb-2">{nft.assetDetails.onchain_metadata.description}</p>
                            <div className="text-sm text-gray-400">
                                <p className="mb-1">
                                    <span className="font-medium">Policy ID: </span>
                                    <span className="break-all">{nft.assetDetails.policy_id}</span>
                                </p>
                                <p className="mb-1">
                                    <span className="font-medium">Fingerprint: </span>
                                    <span className="break-all">{nft.assetDetails.fingerprint}</span>
                                </p>
                                <p>
                                    <span className="font-medium">Quantity: </span>
                                    {nft.quantity}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};