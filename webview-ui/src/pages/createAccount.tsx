import React from 'react'
import { copyToClipboard } from '../utils';

interface ICreateAccountProps {
    handleGeneratePrivateKey: () => void;
    handleGenerateSeedPhrase: () => void;
    privateKey: string;
    seedPhrase: string;
}

export const CreateAccount = ({ handleGeneratePrivateKey, handleGenerateSeedPhrase, privateKey, seedPhrase }: ICreateAccountProps) => {
    return (
        <div className="flex flex-col gap-4">
            <button onClick={handleGeneratePrivateKey} className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow px-4 py-2">
                Generate Private Key
            </button>
            <button onClick={handleGenerateSeedPhrase} className="bg-green-600 text-white hover:bg-green-700 rounded-lg shadow px-4 py-2">
                Generate Seed Phrase
            </button>
            <div className="mt-2 flex items-center">
                <label className="font-semibold text-white block">Private Key</label>
                <span className="inline-block text-blue-600 bg-gray-200 px-3 py-1 rounded ml-2">{privateKey}</span>
                <button onClick={() => copyToClipboard(privateKey)} className="ml-2 text-white">
                    📋
                </button>
            </div>
            <div className="mt-2 flex items-center">
                <label className="font-semibold text-white block">Seed Phrase</label>
                <span className="inline-block text-blue-600 bg-gray-200 px-3 py-1 rounded ml-2">{seedPhrase}</span>
                <button onClick={() => copyToClipboard(seedPhrase)} className="ml-2 text-white">
                    📋
                </button>
            </div>
        </div>
    )
}
