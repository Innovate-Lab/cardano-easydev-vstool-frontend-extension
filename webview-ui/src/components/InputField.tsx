import React from 'react';

interface InputFieldProps {
    label: string;
    value: string;
}

export const InputField = ({ label, value }: InputFieldProps) => (
    <div className="flex flex-col gap-[8px] items-start self-stretch">
        <span className="h-[10px] shrink-0 basis-auto font-['PP_Mori'] text-[14px] font-semibold leading-[10px] text-[#00ffb2]">
            {label}
        </span>
        <div className="flex h-[34px] pt-[24px] pr-[8px] pb-[24px] pl-[8px] gap-[10px] items-center grow shrink-0 basis-0 bg-[rgba(92,92,92,0.27)] rounded-[8px] border-solid border border-[rgba(255,255,255,0.21)]">
            <span className="h-[11px] grow shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-normal leading-[11px] text-[#fff] overflow-hidden whitespace-nowrap">
                {value}
            </span>
        </div>
    </div>
); 