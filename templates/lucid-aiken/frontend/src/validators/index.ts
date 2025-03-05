import { SpendingValidator } from "lucid-cardano"
import plutus from "./example-plutus.json"

// NOTE: This is just an example validator configuration.
// Replace 'example-plutus.json' with your own compiled Plutus validator JSON file
const getSpendingValidator = (): SpendingValidator => {
    const currentValidator = plutus.validators.find((validator) => validator.title === "hello_world.hello_world");

    if (!currentValidator) {
        throw new Error("validator not found");
    }

    return {
        type: "PlutusV2",
        script: currentValidator.compiledCode,
    }
}

export default getSpendingValidator;