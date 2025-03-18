import React, { useState, useEffect, useRef } from 'react';
import { usePlutus } from '../../context/PlutusProvider';
import { resolveAllRefs } from '../../utils/plutusSchema';
import '../../styles/animations.css';

interface ContractFieldsProps {
    setData: (data: any) => void;
}

const ContractFields = ({ setData }: ContractFieldsProps) => {
    const { plutusSchema, currentValidatorIndex } = usePlutus();
    const [mode, setMode] = useState<'lock' | 'unlock'>('lock');
    const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({});

    if (currentValidatorIndex === null) {
        return (
            <div className="space-y-8 max-w-3xl p-6">
                <div className="p-6 rounded-lg bg-gray-800/30 border border-gray-700 text-gray-400">
                    Please select a validator from the sidebar to continue
                </div>
            </div>
        );
    }

    if (!plutusSchema) {
        return (
            <div className="space-y-8 max-w-3xl p-6">
                <div className="p-6 rounded-lg bg-gray-800/30 border border-gray-700 text-gray-400">
                    No Plutus schema loaded. Please upload a schema file.
                </div>
            </div>
        );
    }

    const validator = plutusSchema.validators[currentValidatorIndex];
    const resolvedDatum = resolveAllRefs(validator.datum, plutusSchema);
    const resolvedRedeemer = resolveAllRefs(validator.redeemer, plutusSchema);

    const extractFields = (schema: any) => {
        if (!schema) return [];

        if (schema.fields) return schema.fields;

        if (schema.schema?.anyOf?.[0]?.fields) {
            return schema.schema.anyOf[0].fields;
        }

        if (schema.schema?.fields) {
            return schema.schema.fields;
        }

        return [];
    };

    const datumFields = extractFields(resolvedDatum);
    const redeemerFields = extractFields(resolvedRedeemer);

    const handleFieldChange = (field: any, value: string) => {
        // Create new fieldValues object with the latest value
        const newFieldValues = {
            ...fieldValues,
            [field.title]: value
        };

        // Update state
        setFieldValues(newFieldValues);

        // Use newFieldValues instead of fieldValues to get the latest value immediately
        // const dataWithValues = datumFields.map(field => ({
        //     dataType: field.dataType,
        //     title: field.title,
        //     value: newFieldValues[field.title] || ''
        // }));

        // setData(dataWithValues);
    };

    const TableSection = ({ title, fields }: { title: string, fields: any[] }) => {
        const [isVisible, setIsVisible] = useState(false);

        useEffect(() => {
            setIsVisible(true);
        }, []);

        return (
            <div className={`mb-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-lg font-medium text-gray-200 mb-4 relative group inline-block">
                    {title}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 
                               group-hover:w-full transition-all duration-500 ease-out"></span>
                </h3>
                <div className="space-y-4">
                    {fields.length === 0 || fields[0]?.description === "The nullary constructor." ? (
                        <div className="p-6 rounded-lg bg-gray-800/30 
                                  border border-gray-700 hover:border-gray-600 
                                  transition-all duration-300 group">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500/50 
                                          group-hover:bg-blue-400 transition-colors duration-300"></div>
                                <span className="text-gray-400 group-hover:text-gray-300 
                                           transition-colors duration-300">
                                    Type: <span className="text-blue-400 font-medium">void</span>
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-500 pl-5">
                                This {title.toLowerCase()} doesn't require any input parameters
                            </p>
                        </div>
                    ) : (
                        fields.map((field: any, index: number) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 p-4 rounded-lg 
                                     hover:bg-gray-800/50 group
                                     transform transition-all duration-300 hover:translate-x-2"
                            >
                                <div className="w-1/4">
                                    <div className="text-sm text-gray-400 group-hover:text-blue-400 
                                              transition-colors duration-300">{field.dataType}</div>
                                    <div className="text-gray-200 group-hover:text-white 
                                              transition-colors duration-300">{field.title || '-'}</div>
                                </div>
                                <div className="w-3/4">
                                    <input
                                        type="text"
                                        value={fieldValues[field.title] || ''}
                                        onChange={(e) => handleFieldChange(field, e.target.value)}
                                        className="w-full bg-gray-800 rounded-md px-4 py-3 text-gray-200
                                             border border-gray-700 transition-colors duration-300
                                             focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 
                                             focus:outline-none hover:border-gray-600
                                             placeholder-gray-500"
                                        placeholder={`Enter ${field.dataType} value`}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8 max-w-3xl p-6">
            <div className="inline-flex p-1 space-x-2 bg-gray-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                <button
                    onClick={() => setMode('lock')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-all duration-300 
                    ${mode === 'lock'
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 translate-y-[-1px]'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                        }`}
                >
                    <span>Lock Assets</span>
                </button>
                <button
                    onClick={() => setMode('unlock')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-all duration-300
                    ${mode === 'unlock'
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 translate-y-[-1px]'
                            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                        }`}
                >
                    <span>Unlock Assets</span>
                </button>
            </div>

            {mode === 'lock' ? (
                <TableSection title="Datum" fields={datumFields} />
            ) : (
                <TableSection title="Redeemer" fields={redeemerFields} />
            )}
        </div>
    );
};

export default ContractFields; 