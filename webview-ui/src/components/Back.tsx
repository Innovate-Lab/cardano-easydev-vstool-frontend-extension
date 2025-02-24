import React from 'react'
import { BackIcon } from './icons/BackIcon'
import { useNavigate } from 'react-router-dom'

interface IBackProps {
    title: string;
    onClick: () => void;
}

export const Back = ({ title, onClick }: IBackProps) => {
    return (
        <div className="flex items-center gap-[11px]">
            <BackIcon onClick={onClick} />
            <span className="font-['PP_Mori'] text-[16px] font-normal text-white">{title}</span>
        </div>
    )
}
