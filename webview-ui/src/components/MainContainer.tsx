import React from 'react'

interface MainContainerProps {
    children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
    return (
        <div className="main-container relative overflow-hidden mx-auto my-0 w-full max-w-[720px] min-h-screen px-4">
            {children}
        </div>
    )
}
