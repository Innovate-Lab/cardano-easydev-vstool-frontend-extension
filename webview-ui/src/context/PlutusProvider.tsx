import React, { createContext, useContext, useState } from 'react';
import { PlutusSchema } from '../types/plutusSchema';

interface PlutusContextType {
    plutusSchema: PlutusSchema | null;
    setPlutusSchema: (schema: PlutusSchema | null) => void;
    currentValidatorIndex: number | null;
    setCurrentValidatorIndex: (index: number | null) => void;
}

const PlutusContext = createContext<PlutusContextType | undefined>(undefined);

export function PlutusProvider({ children }: { children: React.ReactNode }) {
    const [plutusSchema, setPlutusSchema] = useState<PlutusSchema | null>(null);
    const [currentValidatorIndex, setCurrentValidatorIndex] = useState<number | null>(null);

    return (
        <PlutusContext.Provider value={{ plutusSchema, setPlutusSchema, currentValidatorIndex, setCurrentValidatorIndex }}>
            {children}
        </PlutusContext.Provider>
    );
}

export function usePlutus() {
    const context = useContext(PlutusContext);
    if (context === undefined) {
        throw new Error('usePlutus must be used within a PlutusProvider');
    }
    return context;
} 