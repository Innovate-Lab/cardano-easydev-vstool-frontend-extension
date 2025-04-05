interface AssetToggleButtonProps {
    type: 'lock' | 'unlock';
    isActive?: boolean;
    onClick?: () => void;
}

const ASSET_ICONS = {
    lock: "https://static.codia.ai/image/2025-03-12/c1521d98-fb1d-45ee-98ea-ba3ba0410a4d.svg",
    unlock: "https://static.codia.ai/image/2025-03-12/96022769-dc0a-414e-8df6-4c3017949a19.svg"
} as const;

const ASSET_LABELS = {
    lock: "Lock Assets",
    unlock: "Unlock Assets"
} as const;

export const AssetToggleButton: React.FC<AssetToggleButtonProps> = ({
    type,
    isActive = false,
    onClick
}) => {
    return (
        <div
            onClick={onClick}
            className={`flex w-full pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[5px] items-center rounded-[12px] relative ${isActive ? 'bg-[#fff]' : ''
                }`}
        >
            <div
                className="w-[24px] h-[24px] shrink-0 bg-cover bg-no-repeat relative overflow-hidden"
                style={{ backgroundImage: `url(${ASSET_ICONS[type]})` }}
            />
            <div className="flex gap-[8px] items-center relative">
                <span className={`h-[11px] font-['PP_Mori'] text-[16px] font-normal leading-[11px] relative text-left whitespace-nowrap ${isActive ? 'text-[#01323d]' : 'text-[#6c6c6c]'
                    }`}>
                    {ASSET_LABELS[type]}
                </span>
            </div>
        </div>
    );
}; 