import React from 'react';

interface AssetButtonProps {
    label: string;
    icon: string;
}

export const AssetButton = ({ label, icon }: AssetButtonProps) => (
    <div className="flex w-[125px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] items-center shrink-0 flex-nowrap bg-[rgba(255,255,255,0.2)] rounded-[12px]">
        <div className={`w-[16px] h-[16px] shrink-0 bg-[url(${icon})] bg-cover bg-no-repeat`} />
        <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-normal leading-[11px] text-[#fff]">
            {label}
        </span>
    </div>
); 