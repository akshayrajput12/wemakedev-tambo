import { motion } from 'framer-motion';

export default function ContactFAQ() {
    const faqs = [
        {
            icon: "help",
            question: "Is TCD MultiRecruit free for candidates?",
            answer: "Yes, searching and applying for jobs is 100% free for candidates. We are committed to helping you find your dream job without barriers."
        },
        {
            icon: "business_center",
            question: "How do I post a job vacancy?",
            answer: "Employers can create an account and click \"Post a Job\". We offer various pricing tiers including a free trial for first-time recruiters."
        },
        {
            icon: "timer",
            question: "How long does the application process take?",
            answer: "Creating a profile takes about 5 minutes. Applications can be submitted instantly with \"Easy Apply\" or may take longer depending on employer requirements."
        },
        {
            icon: "support",
            question: "How can I contact support?",
            answer: "You can use the form on this page, email us directly, or call our support line during business hours for immediate assistance."
        }
    ];

    return (
        <section className="mt-20 lg:mt-32">
            <div className="text-center mb-12">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary dark:bg-blue-900/30 dark:text-blue-300 mb-3"
                >
                    Help Center
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-bold text-slate-dark dark:text-white"
                >
                    Frequently Asked Questions
                </motion.h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
                {faqs.map((faq, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ y: -5 }}
                        className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 dark:bg-[#1e293b] dark:border-gray-700 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex gap-4">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-primary dark:bg-blue-900/30">
                                <span className="material-symbols-outlined text-xl">{faq.icon}</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-dark dark:text-white">{faq.question}</h3>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
