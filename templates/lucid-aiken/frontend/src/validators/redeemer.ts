import { Data } from "lucid-cardano";

const RedeemerSchema = Data.Object({
    msg: Data.Bytes()
})

type Redeemer = Data.Static<typeof RedeemerSchema>;

export const Redeemer = RedeemerSchema as unknown as Redeemer