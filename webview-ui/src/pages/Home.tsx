import { useNavigate } from "react-router-dom";
import { DappIcon } from "../components/icons/DappIcon";
import { DevelopmentIcon } from "../components/icons/DevelopmentIcon";
import { Simulation } from "../components/icons/Simulation";
import { WalletIcon } from "../components/icons/WalletIcon";
import { MenuItem } from "../components/MenuItem";

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="main-container relative overflow-hidden mx-auto my-0 w-full max-w-[720px] min-h-screen px-4">
            <div className="flex w-full max-w-[583px] p-6 flex-col gap-4 items-start flex-nowrap bg-[rgba(0,178,255,0.1)] rounded-3xl md:rounded-[48px] border-solid border-[3px] border-[rgba(255,255,255,0.09)] relative z-[3] mt-[10vh] md:mt-[164px] mx-auto md:ml-[64px]">
                <MenuItem
                    onClick={() => navigate("/wallet")}
                    icon={<WalletIcon />}
                    title="Wallet"
                />
                <MenuItem
                    onClick={() => navigate("/development")}
                    icon={<DevelopmentIcon />}
                    title="Development"
                />
                <MenuItem
                    onClick={() => navigate("/create-dapp")}
                    icon={<DappIcon />}
                    title="Create dapp template"
                />
                <MenuItem
                    onClick={() => navigate("/simulation")}
                    icon={<Simulation />}
                    title="Simulation"
                />
            </div>
        </div>
    );
}