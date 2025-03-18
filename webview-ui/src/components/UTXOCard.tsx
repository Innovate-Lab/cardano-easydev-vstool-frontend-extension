interface UTXOAmount {
    unit: string;
    quantity: string;
}

export interface UTXO {
    tx_hash: string;
    tx_index: number;
    output_index: number;
    amount: UTXOAmount[];
    block: string;
}

interface UTXOCardProps {
    utxo: UTXO;
}

export const UTXOCard = ({ utxo }: UTXOCardProps) => {
    const lovelaceAmount = utxo.amount.find(amt => amt.unit === 'lovelace')?.quantity || '0';
    const formattedAda = (parseInt(lovelaceAmount) / 1000000).toFixed(6);

    return (
        <div className="bg-[rgba(92,92,92,0.27)] rounded-[12px] border border-[rgba(255,255,255,0.21)] p-4">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="text-white/50 text-sm">UTXO</span>
                    <span className="text-white font-semibold">{formattedAda} ₳</span>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <span className="text-white/50 text-xs">Tx Hash:</span>
                        <span className="text-white/70 text-xs truncate">{utxo.tx_hash}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-white/50 text-xs">Output Index:</span>
                        <span className="text-white/70 text-xs">{utxo.output_index}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}; 