import { motion } from 'framer-motion';

export default function AboutJourney() {
    const milestones = [
        { year: "2018", title: "Founding Year", desc: "TCD MultiRecruit was established in a small office in London with a vision to modernize traditional recruitment practices." },
        { year: "2020", title: "Digital Transformation", desc: "Launched our AI-powered candidate matching platform, helping 500+ companies streamline their hiring remotely." },
        { year: "2022", title: "Global Expansion", desc: "Opened offices in New York, Singapore, and Berlin, expanding our reach to serve a truly global market." },
        { year: "2023", title: "Industry Leader", desc: "Recognized as the \"Top Recruitment Agency Tech\" by HR World Awards, serving over 10,000 corporate clients." }
    ];

    return (
        <section className="bg-gray-50 dark:bg-[#1e293b] py-20 lg:py-28 border-y border-[#e7edf4] dark:border-gray-800 text-slate-dark dark:text-white transition-colors duration-300">
            <div className="mx-auto max-w-[1440px] px-6 lg:px-20">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold tracking-wide text-primary uppercase mb-2"
                    >
                        Our Journey
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl font-bold sm:text-4xl"
                    >
                        A history of growth
                    </motion.h3>
                </div>
                <div className="relative mx-auto max-w-4xl">
                    <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
                    {milestones.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative mb-12 flex flex-col md:flex-row md:items-center justify-between"
                        >
                            {index % 2 === 0 ? (
                                <>
                                    <div className="order-1 md:w-[45%] md:text-right">
                                        <h4 className="text-2xl font-bold text-primary">{item.year}</h4>
                                        <h5 className="text-lg font-bold mt-1 text-inherit">{item.title}</h5>
                                        <p className="mt-2 text-gray-500 dark:text-gray-400">{item.desc}</p>
                                    </div>
                                    <div className="z-10 order-1 my-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary ring-4 ring-white dark:ring-[#1e293b] md:order-2 md:my-0">
                                        <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                                    </div>
                                    <div className="order-1 md:w-[45%] md:invisible"></div>
                                </>
                            ) : (
                                <>
                                    <div className="order-1 md:w-[45%] md:invisible"></div>
                                    <div className="z-10 order-1 my-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary ring-4 ring-white dark:ring-[#1e293b] md:order-2 md:my-0">
                                        <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                                    </div>
                                    <div className="order-1 md:w-[45%] text-left">
                                        <h4 className="text-2xl font-bold text-primary">{item.year}</h4>
                                        <h5 className="text-lg font-bold mt-1 text-inherit">{item.title}</h5>
                                        <p className="mt-2 text-gray-500 dark:text-gray-400">{item.desc}</p>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
