import React from 'react'
import { motion } from 'framer-motion'

interface NotifyCardProps {
    type: 'success' | 'error';
    title: string;
    message: string;
    onClose?: () => void;
}

export const NotifyCard = ({ type, title, message, onClose }: NotifyCardProps) => {
    const styles = {
        success: {
            bg: 'bg-[rgba(0,161,155,0.1)]',
            icon: {
                bg: 'bg-[#00A19B]',
                path: 'M11.6667 5.25L5.25 11.6667L2.33333 8.75'
            }
        },
        error: {
            bg: 'bg-[rgba(255,59,48,0.1)]',
            icon: {
                bg: 'bg-[#FF3B30]',
                path: 'M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5'
            }
        }
    }

    const currentStyle = styles[type]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col w-full max-w-[583px] p-6 gap-4 items-start ${currentStyle.bg} rounded-3xl md:rounded-[48px] border-solid border-[3px] border-[rgba(255,255,255,0.09)] relative z-[3] mx-auto`}
        >
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className={`w-[32px] h-[32px] ${currentStyle.icon.bg} rounded-full flex items-center justify-center`}
                    >
                        <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                            <path
                                d={currentStyle.icon.path}
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.div>
                    <motion.span
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="font-['PP_Mori'] text-[20px] font-semibold text-white"
                    >
                        {title}
                    </motion.span>
                </div>
                {onClose && (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="w-[32px] h-[32px] bg-[rgba(92,92,92,0.27)] rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.21)] hover:bg-[rgba(92,92,92,0.4)] transition-colors"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path
                                d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.button>
                )}
            </div>
            <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="font-['PP_Mori'] text-[16px] text-white/70"
            >
                {message}
            </motion.p>
        </motion.div>
    )
}
