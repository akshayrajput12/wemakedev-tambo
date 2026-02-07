import { motion } from 'framer-motion';

export default function ContactForm() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl bg-white p-8 shadow-xl dark:bg-[#1e293b] sm:p-12 border border-blue-50 dark:border-gray-700 mt-12 lg:mt-20 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
                <h2 className="text-2xl font-bold text-slate-dark dark:text-white mb-2">Send us a Message</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Fill out the form below and our team will get back to you within 24 hours.</p>

                <form className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-slate-dark dark:text-gray-300 mb-2">Full Name</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="material-symbols-outlined text-gray-400 text-lg">person</span>
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="John Doe"
                                    className="block w-full rounded-lg border-gray-300 pl-10 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-slate-800/50 dark:text-white sm:text-sm py-3 transition-all outline-none ring-1 ring-transparent focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-dark dark:text-gray-300 mb-2">Email Address</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="material-symbols-outlined text-gray-400 text-lg">email</span>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="john@example.com"
                                    className="block w-full rounded-lg border-gray-300 pl-10 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-slate-800/50 dark:text-white sm:text-sm py-3 transition-all outline-none ring-1 ring-transparent focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-slate-dark dark:text-gray-300 mb-2">Subject</label>
                        <div className="relative">
                            <select
                                id="subject"
                                name="subject"
                                className="block w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-slate-800/50 dark:text-white sm:text-sm py-3 transition-all outline-none ring-1 ring-transparent focus:shadow-md"
                            >
                                <option>General Inquiry</option>
                                <option>Candidate Support</option>
                                <option>Employer Partnership</option>
                                <option>Technical Issue</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-slate-dark dark:text-gray-300 mb-2">Message</label>
                        <div className="relative">
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                placeholder="How can we help you?"
                                className="block w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-slate-800/50 dark:text-white sm:text-sm p-4 transition-all outline-none ring-1 ring-transparent focus:shadow-md resize-y"
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            id="privacy"
                            name="privacy"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-slate-800 cursor-pointer"
                        />
                        <label htmlFor="privacy" className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer select-none">
                            I agree to the <a href="#" className="font-medium text-primary hover:underline">Privacy Policy</a>
                        </label>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full flex justify-center items-center gap-2 rounded-lg bg-primary px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        Send Message
                        <span className="material-symbols-outlined text-sm font-bold">send</span>
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
}
