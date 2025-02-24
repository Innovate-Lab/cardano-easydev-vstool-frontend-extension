import React from 'react'

interface IBackIconProps {
    onClick: () => void;
}

export const BackIcon = ({ onClick }: IBackIconProps) => {
    return (
        <button className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center border-none" onClick={onClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    )
}
