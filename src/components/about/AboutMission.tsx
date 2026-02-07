import { motion } from 'framer-motion';

export default function AboutMission() {
    const values = [
        { icon: "verified", title: "Trust & Integrity", desc: "We build relationships based on transparency and honest communication." },
        { icon: "rocket_launch", title: "Innovation First", desc: "Leveraging AI and data to make smarter, faster hiring decisions." },
        { icon: "groups", title: "Inclusive Growth", desc: "Championing diversity and equal opportunity in every search." },
        { icon: "globe", title: "Global Reach", desc: "Connecting talent across borders with seamless efficiency." }
    ];

    return (
        <section className="bg-white dark:bg-background-dark py-20 lg:py-28 text-slate-dark dark:text-white transition-colors duration-300">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
                <div className="grid gap-16 lg:grid-cols-2 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute -top-4 -left-4 h-24 w-24 bg-blue-50 dark:bg-blue-900/20 rounded-full -z-10"></div>
                        <div className="absolute -bottom-4 -right-4 h-32 w-32 bg-gray-50 dark:bg-gray-800 rounded-full -z-10"></div>
                        <img alt="Team collaborating in a modern office" className="relative z-10 w-full rounded-2xl shadow-xl object-cover h-[500px]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3fBXFKwP-AfuOXo6ohtpX5REXfdSK4xN5rNC46cX3pc_mUCAukeM7kmCmxBwgDbWvqv5xJtAJYdQShEa_AE2fEN0XEedyLCFxFn9-BnUEVkL3Mhnqsfj7FSpXbuewOdM_KOHrzL7Pqbog8rQgxU2CyxewfxZof2rip2-WJIi6GS2Z8Y42PTmogXOkDP4uCbO4FHf1-nlwL6RDf7g0MKN160Y3r-NHh779BTNiVKoR_1mFHnki8TuHWHEUj6Zz6daZpkBRY1EhjY3C" />
                    </motion.div>
                    <div className="flex flex-col gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-sm font-bold tracking-wide text-primary uppercase mb-2">Our Mission</h2>
                            <h3 className="text-3xl font-bold sm:text-4xl text-inherit">Connecting people with purpose</h3>
                            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                                Our mission is to simplify the recruitment process through technology and human connection. We strive to create a world where every professional can find a role where they thrive, and every company can build a team that drives success.
                            </p>
                        </motion.div>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {values.map((val, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors cursor-default"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary dark:bg-blue-900/20">
                                        <span className="material-symbols-outlined">{val.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-inherit">{val.title}</h4>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{val.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
