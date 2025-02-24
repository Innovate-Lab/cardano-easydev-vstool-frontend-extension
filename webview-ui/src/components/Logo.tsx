import React from 'react'
import { LogoIcon } from './icons/LogoIcon'

export const Logo = () => {
    return (
        <div className="flex w-[298px] pt-[40px] pr-[40px] pb-[40px] pl-[40px] gap-[16px] items-center flex-nowrap relative z-[24] mt-0 mr-0 mb-0 ml-[3px] transition-transform duration-200 hover:scale-105 cursor-pointer">
            <LogoIcon />
            <div className="w-[142px] shrink-0 font-['Poppins'] text-[30px] font-semibold leading-[45px] tracking-[-0.9px] relative text-left whitespace-nowrap z-[26]">
                <span className="font-['Poppins'] text-[30px] font-semibold leading-[45px] text-[#fff] tracking-[-0.9px] relative text-left">
                    Easy
                </span>
                <span className="font-['Poppins'] text-[30px] font-light leading-[45px] text-[#fff] tracking-[-0.3px] relative text-left">
                    Dev
                </span>
            </div>
        </div>
    )
}
