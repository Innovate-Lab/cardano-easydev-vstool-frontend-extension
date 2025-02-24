import React from 'react'
import { motion } from 'framer-motion'
import { copyToClipboard } from '../utils';

interface ICopyButtonProps {
    text: string;
}

export const CopyButton = ({ text }: ICopyButtonProps) => {
    return (
        <motion.button
            className="w-[32px] h-[32px] cursor-pointer shrink-0"
            title="Copy"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
                copyToClipboard(text);
            }}
        >
            <motion.div
                className="w-full h-full bg-[rgba(92,92,92,0.27)] rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.21)] hover:bg-[rgba(92,92,92,0.4)] transition-colors"
                whileHover={{ rotate: 10 }}
                transition={{ duration: 0.2 }}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.33333 10H2.66667C1.93029 10 1.33334 9.40305 1.33334 8.66667V2.66667C1.33334 1.93029 1.93029 1.33334 2.66667 1.33334H8.66667C9.40305 1.33334 10 1.93029 10 2.66667V3.33333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.div>
        </motion.button>
    )
}
