export interface IGeneratePrivateKeyResponse {
    data: {
        privateKey: string;
    },
    msg: string;
    code: number;
}

export interface IGenerateSeedPhraseResponse {
    data: {
        seedPhrase: string;
    },
    msg: string;
    code: number;
}