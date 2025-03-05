interface Amount {
    unit: string;
    quantity: string;
}

export interface UtxoResponse {
    address: string;
    tx_hash: string;
    tx_index: number;
    output_index: number;
    amount: Amount[];
    block: string;
    data_hash: string | null;
    inline_datum: string | null;
    reference_script_hash: string | null;
}

export interface AssetDetailsResponse {
    asset: string;
    policy_id: string;
    asset_name: string;
    fingerprint: string;
    quantity: string;
    initial_mint_tx_hash: string;
    mint_or_burn_count: number;
    onchain_metadata: object | null;
    onchain_metadata_standard: string | null;
    onchain_metadata_extra: null;
    metadata: null;
} 