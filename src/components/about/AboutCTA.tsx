import { motion } from 'framer-motion';

export default function AboutCTA() {
    return (
        <section className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-20 lg:py-20 mb-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-2xl bg-primary p-12 text-center text-white"
            >
                <div className="absolute right-0 top-0 -mr-32 -mt-32 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-32 -ml-32 h-96 w-96 rounded-full bg-black/10 blur-3xl"></div>
                <div className="relative z-10 mx-auto max-w-2xl">
                    <h2 className="text-3xl font-bold sm:text-4xl">Join the TCD Team</h2>
                    <p className="mt-4 text-lg text-blue-100 mb-8">
                        We are always looking for passionate individuals to join our mission. Explore career opportunities with us.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-[#0A66C2] shadow-lg transition-transform"
                    >
                        View Internal Openings
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}
