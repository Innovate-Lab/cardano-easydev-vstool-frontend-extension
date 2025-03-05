import React from 'react';

interface InfoCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon }) => {
    return (
        <div className="card-hover p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-xl">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white/90">{title}</h3>
                {icon && <div className="text-white/80">{icon}</div>}
            </div>
            <p className="text-3xl font-bold mt-4 text-white tracking-tight">{value}</p>
        </div>
    );
};

export default InfoCard; 