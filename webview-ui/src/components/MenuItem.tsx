interface MenuItemProps {
    onClick: () => void;
    icon: React.ReactNode;
    title: string;
    width?: string;
}

export const MenuItem = ({ icon, title }: MenuItemProps) => {
    return (
        <div className="flex h-auto min-h-[60px] md:min-h-[80px] p-4 md:p-6 justify-between items-center self-stretch w-full bg-[rgba(255,255,255,0.1)] rounded-lg md:rounded-[24px] relative z-[14] cursor-pointer hover:opacity-80 hover:scale-[1.02] hover:bg-[rgba(255,255,255,0.15)] transition-all duration-300 ease-in-out">
            <div className="flex gap-2 md:gap-[8px] items-center relative z-[15]">
                {icon}
                <span className="font-['PP_Mori'] text-lg md:text-[24px] font-normal leading-tight text-white relative text-left whitespace-nowrap z-[17]">
                    {title}
                </span>
            </div>
            <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] shrink-0 bg-[url(../assets/images/8bb5170d-2515-4155-83fe-74e7625b924a.png)] bg-cover bg-no-repeat relative z-[18]" />
        </div>
    );
}; 