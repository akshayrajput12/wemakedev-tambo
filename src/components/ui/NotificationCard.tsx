import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

interface NotificationCardProps {
    title: string;
    message: string;
    type?: 'success' | 'error' | 'info';
    isVisible: boolean;
    onClose: () => void;
}

export default function NotificationCard({ title, message, type = 'success', isVisible, onClose }: NotificationCardProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 500000000); // Intentionally long for demo/manual close, or user can click
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    // Use a simpler timeout for auto-close in real usage, e.g. 5000ms
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 right-6 z-50 pointer-events-none"
                >
                    <div className={`pointer-events-auto bg-white dark:bg-zinc-900 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 dark:border-zinc-800 p-5 w-80 flex items-start gap-4 backdrop-blur-sm`}>
                        <div className={`shrink-0 size-10 rounded-full flex items-center justify-center ${type === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500' :
                            type === 'error' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500' :
                                'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500'
                            }`}>
                            <span className="material-symbols-outlined text-[24px]">
                                {type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 dark:text-white text-base mb-0.5">{title}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">{message}</p>
                        </div>
                        <button onClick={onClose} className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
