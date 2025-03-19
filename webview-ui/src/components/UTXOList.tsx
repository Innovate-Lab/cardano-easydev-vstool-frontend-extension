import { UTXO, UTXOCard } from './UTXOCard';

interface UTXOListProps {
    utxos: UTXO[];
}

export const UTXOList = ({ utxos }: UTXOListProps) => {
    const totalLovelace = utxos.reduce((sum, utxo) => {
        const lovelaceAmount = utxo.amount.find(amt => amt.unit === 'lovelace')?.quantity || '0';
        return sum + parseInt(lovelaceAmount);
    }, 0);

    const totalAda = (totalLovelace / 1000000).toFixed(6);

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center p-4 bg-[rgba(0,178,255,0.1)] rounded-[12px] border border-[rgba(255,255,255,0.09)]">
                <span className="text-white text-lg">Total Balance</span>
                <span className="text-white text-lg font-semibold">{totalAda} ₳</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {utxos.map((utxo, index) => (
                    <UTXOCard
                        key={`${utxo.tx_hash}-${utxo.output_index}`}
                        utxo={utxo}
                    />
                ))}
            </div>
        </div>
    );
}; 