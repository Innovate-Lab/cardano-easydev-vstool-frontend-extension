import { Data } from "lucid-cardano";
import { SchemaDefinition, PlutusSchema } from "../types/plutusSchema";

export const resolveSchemaRef = (ref: string, schema: PlutusSchema): SchemaDefinition | null => {
    if (!ref.startsWith('#/definitions/')) {
        return null;
    }

    const definitionKey = ref.replace('#/definitions/', '').replace('~1', '/');
    return schema.definitions[definitionKey] || null;
};

export const resolveAllRefs = (obj: any, schema: PlutusSchema): any => {
    if (!obj) return obj;

    if (typeof obj === 'object') {
        // Handle arrays
        if (Array.isArray(obj)) {
            return obj.map(item => resolveAllRefs(item, schema));
        }

        // Handle object with $ref while preserving other attributes
        if (obj.$ref) {
            const resolved = resolveSchemaRef(obj.$ref, schema);
            const { $ref, ...restAttributes } = obj; // Keep all attributes except $ref

            // If the resolved object has fields, resolve refs in those fields too
            if (resolved?.anyOf?.[0]?.fields) {
                return {
                    ...restAttributes, // Preserve original attributes
                    ...resolved,
                    anyOf: resolved.anyOf.map(item => ({
                        ...item,
                        fields: item.fields?.map((field: any) => resolveAllRefs(field, schema))
                    }))
                };
            }
            return { ...restAttributes, ...resolved }; // Merge resolved with original attributes
        }

        // Handle regular objects
        const resolved: any = {};
        for (const [key, value] of Object.entries(obj)) {
            resolved[key] = resolveAllRefs(value, schema);
        }
        return resolved;
    }

    return obj;
};

const generateDatumSchema = (datumFields: Array<{ dataType: string; title: string; value: string }>) => {
    const schemaObj: { [key: string]: any } = {};

    datumFields.forEach(field => {
        switch (field.dataType) {
            case 'bytes':
                schemaObj[field.title] = Data.Bytes();
                break;
            case 'integer':
                schemaObj[field.title] = Data.Integer();
                break;
            default:
                schemaObj[field.title] = Data.Bytes(); // fallback to Bytes
        }
    });

    return Data.Object(schemaObj);
};
