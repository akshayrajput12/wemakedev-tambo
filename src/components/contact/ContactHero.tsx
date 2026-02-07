import { motion } from 'framer-motion';

export default function ContactHero() {
    return (
        <div className="relative w-full bg-slate-dark text-white py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-dark/90 to-slate-dark"></div>
            <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-center justify-center px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl mb-4"
                >
                    Get in Touch
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-2xl text-lg text-gray-300 sm:text-lg lg:text-xl"
                >
                    Have questions about finding a job or hiring talent? We're here to help you every step of the way.
                </motion.p>
            </div>
        </div>
    );
}
