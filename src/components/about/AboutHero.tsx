import { motion } from 'framer-motion';

export default function AboutHero() {
    return (
        <div className="relative w-full bg-background-dark text-white min-h-[600px] flex items-center">
            <div className="absolute inset-0 z-0">
                <div style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop')" }} className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"></div>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-dark via-slate-dark/90 to-slate-dark/60"></div>
            </div>
            <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-start justify-center px-6 py-20 lg:px-20 lg:py-32 h-full w-full">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-blue-300 border border-primary/30"
                >
                    Established 2018
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl mb-6"
                >
                    Redefining the Future of <br /><span className="text-primary text-blue-400">Talent Acquisition</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-2xl text-lg text-gray-300 sm:text-xl leading-relaxed"
                >
                    At TCD MultiRecruit, we believe that the right job can transform a life, and the right talent can transform a business. We are the bridge between ambition and opportunity.
                </motion.p>
            </div>
        </div>
    );
}
