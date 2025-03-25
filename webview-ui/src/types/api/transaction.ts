export interface Amount {
    unit: string;
    quantity: string;
}

export interface Transaction {
    hash: string;
    block: string;
    block_height: number;
    block_time: number;
    slot: number;
    index: number;
    output_amount: Amount[];
    fees: string;
    deposit: string;
    size: number;
    invalid_before: number | null;
    invalid_hereafter: number | null;
    utxo_count: number;
    withdrawal_count: number;
    mir_cert_count: number;
    delegation_count: number;
    stake_cert_count: number;
    pool_update_count: number;
    pool_retire_count: number;
    asset_mint_or_burn_count: number;
    redeemer_count: number;
    valid_contract: boolean;
}

export interface ITransactionsResponse {
    data: {
        transactions: Transaction[];
    };
    msg: string;
    code: number;
} 