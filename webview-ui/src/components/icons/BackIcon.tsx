import React from 'react'
import { motion } from 'framer-motion'

interface IBackIconProps {
    onClick: () => void;
}

export const BackIcon = ({ onClick }: IBackIconProps) => {
    return (
        <motion.button
            className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center border-none"
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                whileHover={{ x: -2 }}
                transition={{ duration: 0.2 }}
            >
                <path d="M15 18L9 12L15 6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
        </motion.button>
    )
}
