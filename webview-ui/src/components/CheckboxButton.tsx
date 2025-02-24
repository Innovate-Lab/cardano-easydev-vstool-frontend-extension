import React from 'react'

interface ICheckboxButtonProps {
    checked: boolean;
}

export const CheckboxButton = ({ checked }: ICheckboxButtonProps) => {
    return (
        <>
            {!checked ? <div className="w-[32px] h-[32px] cursor-pointer">
                <div className="w-full h-full bg-[rgba(92,92,92,0.27)] rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.21)]" />
            </div> : <div className="w-[32px] h-[32px] cursor-pointer">
                <div className="w-full h-full bg-[#00A19B] rounded-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                        <path d="M11.6667 5.25L5.25 11.6667L2.33333 8.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>}
        </>
    )
}
