import { motion } from 'framer-motion';

// Mock logos for marquee (using text/colors as placeholders since we don't have real svg assets yet, but making it look pro)
// In a real app, these would be proper SVGs
const companies = [
    { name: "Google", color: "text-blue-500" },
    { name: "Microsoft", color: "text-green-500" },
    { name: "Spotify", color: "text-green-400" },
    { name: "Amazon", color: "text-orange-500" },
    { name: "Netflix", color: "text-red-500" },
    { name: "Airbnb", color: "text-rose-500" },
    { name: "Uber", color: "text-black dark:text-white" },
    { name: "Adobe", color: "text-red-600" },
    { name: "Slack", color: "text-purple-500" },
];

export default function TrustedBy() {
    return (
        <section className="w-full border-b border-[#e7edf4] bg-white py-12 dark:bg-[#101922] dark:border-gray-800 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white dark:from-[#101922] dark:via-transparent dark:to-[#101922] z-10 pointer-events-none"></div>

            <div className="mx-auto max-w-[1440px] px-6 lg:px-20 mb-10 text-center relative z-20">
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    Trusted by 10,000+ world-class teams
                </p>
            </div>

            <div className="flex relative z-0">
                <motion.div
                    className="flex gap-16 items-center whitespace-nowrap px-8"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear",
                    }}
                >
                    {[...companies, ...companies, ...companies].map((company, index) => (
                        <div key={index} className="flex items-center gap-2 group cursor-default">
                            {/* Placeholder Logo Icon */}
                            <div className={`text-2xl font-black tracking-tighter ${company.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
                                {company.name}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
