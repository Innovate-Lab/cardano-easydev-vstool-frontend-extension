import { Data, fromText, Lucid } from "lucid-cardano";

import getSpendingValidator from "./index";
import { Datum } from "./datum";
import { Redeemer } from "./redeemer";

// NOTE: This is just an example of how to interact with a validator.
// Replace 'Datum' and 'Redeemer' with your own datum and redeemer types.
export const lock = async (address: string, lucid: Lucid, ada: number) => {
    try {
        if (!address) {
            throw new Error("Address not found");
        }

        const ownerPubKeyHash = await lucid?.utils.getAddressDetails(address).paymentCredential?.hash;

        if (!ownerPubKeyHash) {
            throw new Error("Owner public key hash not found");
        }

        const datum = Data.to(
            {
                owner: ownerPubKeyHash
            },
            Datum
        )

        const validator = getSpendingValidator();

        const contractAddress = lucid?.utils.validatorToAddress(validator)

        if (!contractAddress) {
            throw new Error("Contract address not found");
        }

        const tx = await lucid?.newTx().payToContract(contractAddress, { inline: datum }, {
            lovelace: BigInt(ada) * 10n ** 6n
        }).complete();

        if (!tx) {
            throw new Error("Transaction not found");
        }

        const signedTx = await tx.sign().complete();

        const txHash = await signedTx.submit();

        return txHash;
    } catch (error) {
        console.error("Error locking:", error);
    }
}

export const unlock = async (address: string, lucid: Lucid) => {
    try {
        const redeemer = Data.to({
            msg: fromText("Hello, World!")
        }, Redeemer)

        const validator = getSpendingValidator();

        const contractAddress = lucid?.utils.validatorToAddress(validator)

        if (!contractAddress) {
            throw new Error("Contract address not found");
        }

        if (!address) {
            throw new Error("Address not found");
        }

        const ownerPubKeyHash = await lucid?.utils.getAddressDetails(address).paymentCredential?.hash;

        if (!ownerPubKeyHash) {
            throw new Error("Owner public key hash not found");
        }

        const utxos = await lucid?.utxosAt(contractAddress);

        if (!utxos || utxos.length === 0) {
            throw new Error("No UTXOs found at contract address");
        }

        const tx = await lucid?.newTx().collectFrom([utxos[0]], redeemer).attachSpendingValidator(validator).addSigner(address).complete();

        if (!tx) {
            throw new Error("Transaction not found");
        }

        const signedTx = await tx.sign().complete();

        const txHash = await signedTx.submit();

        return txHash;
    } catch (error) {
        console.error("Error unlocking:", error);
    }
}