import { useNavigate } from 'react-router-dom';

import { GlassCard } from "../components/GlassCard";
import { DappIcon } from "../components/icons/DappIcon";
import { DevelopmentIcon } from "../components/icons/DevelopmentIcon";
import { Simulation } from "../components/icons/Simulation";
import { WalletIcon } from "../components/icons/WalletIcon";
import { MenuItem } from "../components/MenuItem";
import { MainContainer } from '../components/MainContainer';

export const Home = () => {
    const navigate = useNavigate();

    return (
        <MainContainer>
            <GlassCard>
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
            </GlassCard>
        </MainContainer>
    );
}