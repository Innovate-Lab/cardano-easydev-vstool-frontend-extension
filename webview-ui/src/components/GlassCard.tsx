import React from 'react'

interface GlassCardProps {
    children: React.ReactNode;
}

export const GlassCard = ({ children }: GlassCardProps) => {
    return (
        <div className="flex w-full max-w-[583px] p-6 flex-col gap-4 items-start flex-nowrap bg-[rgba(0,178,255,0.1)] rounded-3xl md:rounded-[48px] border-solid border-[3px] border-[rgba(255,255,255,0.09)] relative z-[3] mt-[10vh] md:mt-[164px] mx-auto md:ml-[64px]">
            {children}
        </div>
    )
}
