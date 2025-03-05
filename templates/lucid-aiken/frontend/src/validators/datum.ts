import { Data } from "lucid-cardano";

const DatumSchema = Data.Object({
    owner: Data.Bytes(),
})

// enable type safety when accessing the datum fields
type Datum = Data.Static<typeof DatumSchema>;

export const Datum = DatumSchema as unknown as Datum