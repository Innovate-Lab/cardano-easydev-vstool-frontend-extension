import React from 'react';

type ValidatorType = 'spend';

interface ChooseValidatorButtonProps {
    type: ValidatorType;
    onClick?: () => void;
}

export const ChooseValidatorButton: React.FC<ChooseValidatorButtonProps> = ({
    type,
    onClick
}) => {
    const iconUrl = "https://static.codia.ai/image/2025-03-12/5034f174-1e30-4879-a8d3-6bcf0cfe155b.svg";

    return (
        <div
            className="flex w-[125px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[10px] items-center shrink-0 flex-nowrap bg-[rgba(255,255,255,0.2)] rounded-[12px] relative cursor-pointer"
            onClick={onClick}
        >
            <div className="w-[16px] h-[16px] shrink-0 bg-cover bg-no-repeat relative" style={{ backgroundImage: `url(${iconUrl})` }} />
            <div className="flex w-[67px] gap-[8px] items-center shrink-0 flex-nowrap relative">
                <span className="h-[11px] shrink-0 basis-auto font-['PP_Mori'] text-[16px] font-normal leading-[11px] text-[#fff] relative text-left whitespace-nowrap">
                    Validator
                </span>
            </div>
        </div>
    );
}; 