import axios from "axios";
import { AssetDetailsResponse, UtxoResponse } from "../types/api/blockforst/index";

class BlockforstService {
    private baseUrl: string;
    private projectId: string;

    constructor() {
        this.baseUrl = "";
        this.projectId = "";
    }

    async getUtxosByAddress(address: string) {
        if (!address) throw new Error('Address is required');

        try {
            const { data } = await axios.get<UtxoResponse[]>(
                `${this.baseUrl}/addresses/${address}/utxos`,
                {
                    headers: {
                        'Project_id': this.projectId
                    }
                }
            );
            return data;
        } catch (error) {
            console.error('Error fetching UTXOs:', error);
            throw error;
        }
    }

    private async getAssetDetails(unit: string) {
        if (!unit) throw new Error('Unit is required');

        try {
            const { data } = await axios.get<AssetDetailsResponse>(
                `${this.baseUrl}/assets/${unit}`,
                {
                    headers: {
                        'Project_id': this.projectId
                    }
                }
            );
            return data;
        } catch (error) {
            console.error('Error fetching asset details:', error);
            throw error;
        }
    }

    async getNFTs(address: string) {
        try {
            if (!address) throw new Error('Address is required');

            const utxos = await this.getUtxosByAddress(address);

            const nonLovelaceAssets = utxos.flatMap(utxo =>
                utxo.amount.filter(asset => asset.unit !== 'lovelace')
            );

            const nfts = await Promise.all(nonLovelaceAssets.map(async (asset) => {
                const assetDetails = await this.getAssetDetails(asset.unit);
                return {
                    ...asset,
                    assetDetails
                };
            }));

            return nfts;
        } catch (error) {
            console.error('Error fetching NFTs:', error);
            throw error;
        }
    }
}

export const blockforstService = new BlockforstService();