import React, { useState, useEffect, useRef } from 'react';
import { usePlutus } from '../../context/PlutusProvider';
import { resolveAllRefs } from '../../utils/plutusSchema';
import { AssetToggleButton } from '../AssetToggleButton';

interface ContractFieldsProps {
    setData: (data: any) => void;
    isLockMode: boolean;
    setIsLockMode: (isLockMode: boolean) => void;
}

const ContractFields = ({ setData, isLockMode, setIsLockMode }: ContractFieldsProps) => {
    const { plutusSchema, currentValidatorIndex } = usePlutus();
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

        if (isLockMode) {
            // Use newFieldValues instead of fieldValues to get the latest value immediately
            // @ts-ignore
            const datumWithValues = datumFields.map(field => ({
                dataType: field.dataType,
                title: field.title,
                // @ts-ignore
                value: newFieldValues[field.title] || ''
            }));
            setData(datumWithValues);
        } else {
            // @ts-ignore
            const redeemerWithValues = redeemerFields.map(field => ({
                dataType: field.dataType,
                title: field.title,
                // @ts-ignore
                value: newFieldValues[field.title] || ''
            }));
            setData(redeemerWithValues);
        }
    };

    const TableSection = ({ title, fields }: { title: string, fields: any[] }) => {
        const [isVisible, setIsVisible] = useState(false);

        useEffect(() => {
            setIsVisible(true);
        }, []);

        return (
            <div className={`flex flex-col gap-[12px] items-start self-stretch shrink-0 flex-nowrap ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <span className="h-[15px] shrink-0 basis-auto font-['PP_Mori'] text-[22px] font-semibold leading-[15px] text-[#fff] relative text-left whitespace-nowrap">
                    {title}
                </span>
                <div className="space-y-4">
                    {fields.length === 0 || fields[0]?.description === "The nullary constructor." ? (
                        <div className="p-6 rounded-lg bg-[rgba(92,92,92,0.27)] border border-[rgba(255,255,255,0.21)]">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 rounded-full bg-[#00ffb2]"></div>
                                <span className="text-white">
                                    Type: <span className="text-[#00ffb2] font-medium">void</span>
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-400 pl-5">
                                This {title.toLowerCase()} doesn't require any input parameters
                            </p>
                        </div>
                    ) : (
                        fields.map((field: any, index: number) => (
                            <div key={index} className="flex h-[34px] gap-[8px] items-center self-stretch shrink-0 flex-nowrap">
                                <div className="flex w-[69px] flex-col gap-[8px] justify-center items-start shrink-0 flex-nowrap">
                                    <span className="h-[10px] shrink-0 basis-auto font-['PP_Mori'] text-[14px] font-semibold leading-[10px] text-[#00ffb2]">
                                        {field.dataType}
                                    </span>
                                    <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-semibold leading-[11px] text-white">
                                        {field.title || '-'}
                                    </span>
                                </div>
                                <div className="flex h-[34px] px-[8px] py-[24px] gap-[10px] items-center grow shrink-0 basis-0 flex-nowrap bg-[rgba(92,92,92,0.27)] rounded-[8px] border-solid border border-[rgba(255,255,255,0.21)]">
                                    <input
                                        type="text"
                                        value={fieldValues[field.title] || ''}
                                        onChange={(e) => handleFieldChange(field, e.target.value)}
                                        className="w-full bg-transparent text-[16px] font-normal text-white outline-none"
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
            <div className="flex w-[321px] items-start shrink-0 flex-nowrap bg-[#04242b] rounded-[12px] relative z-[21] gap-2">
                <AssetToggleButton
                    type="lock"
                    isActive={isLockMode}
                    onClick={() => setIsLockMode(true)}
                />
                <AssetToggleButton
                    type="unlock"
                    isActive={!isLockMode}
                    onClick={() => setIsLockMode(false)}
                />
            </div>

            {isLockMode ? (
                <TableSection title="Datum" fields={datumFields} />
            ) : (
                <TableSection title="Redeemer" fields={redeemerFields} />
            )}
        </div>
    );
};

export default ContractFields; 