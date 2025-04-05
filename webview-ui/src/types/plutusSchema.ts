export interface PlutusSchema {
    preamble: {
        title: string;
        description: string;
        version: string;
        plutusVersion: string;
        compiler: {
            name: string;
            version: string;
        };
        license: string;
    };
    validators: ValidatorSchema[];
    definitions: {
        [key: string]: SchemaDefinition;
    };
}

export interface ValidatorSchema {
    title: string;
    datum: {
        title: string;
        schema: {
            $ref: string;
        };
    };
    redeemer: {
        title: string;
        schema: {
            $ref: string;
        };
    };
    compiledCode: string;
    hash: string;
}

export interface SchemaDefinition {
    title?: string;
    description?: string;
    dataType?: string;
    anyOf?: Array<{
        title?: string;
        dataType: string;
        index?: number;
        fields?: Array<{
            title: string;
            $ref: string;
        }>;
    }>;
}
