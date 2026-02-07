import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Share2, Linkedin, Twitter } from 'lucide-react';

export default function ContactInfo() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col gap-10"
            >
                <div>
                    <h2 className="text-2xl font-bold text-slate-dark dark:text-white mb-6">Contact Information</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                        Reach out to our support team directly or visit our headquarters. We are available Monday through Friday, 9:00 AM to 6:00 PM EST.
                    </p>

                    <div className="grid gap-8 sm:grid-cols-2">
                        <motion.div variants={itemVariants} className="flex items-start gap-4 group">
                            <div className="flex bg-blue-50 dark:bg-slate-800 text-primary dark:text-blue-400 size-12 shrink-0 items-center justify-center rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-dark dark:text-white mb-1">Our Office</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    123 Business Avenue, Suite 400<br />New York, NY 10013
                                </p>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex items-start gap-4 group">
                            <div className="flex bg-blue-50 dark:bg-slate-800 text-primary dark:text-blue-400 size-12 shrink-0 items-center justify-center rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-dark dark:text-white mb-1">Email Us</h3>
                                <div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400">
                                    <a href="mailto:support@tcdmultirecruit.com" className="hover:text-primary transition-colors">support@tcdmultirecruit.com</a>
                                    <a href="mailto:careers@tcdmultirecruit.com" className="hover:text-primary transition-colors">careers@tcdmultirecruit.com</a>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex items-start gap-4 group">
                            <div className="flex bg-blue-50 dark:bg-slate-800 text-primary dark:text-blue-400 size-12 shrink-0 items-center justify-center rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-dark dark:text-white mb-1">Call Us</h3>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    <a href="tel:+15551234567" className="block hover:text-primary transition-colors mb-1">+1 (555) 123-4567</a>
                                    <span className="text-xs font-medium bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded text-gray-500 dark:text-gray-400">Mon-Fri 9am-6pm</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex items-start gap-4 group">
                            <div className="flex bg-blue-50 dark:bg-slate-800 text-primary dark:text-blue-400 size-12 shrink-0 items-center justify-center rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <Share2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-dark dark:text-white mb-1">Follow Us</h3>
                                <div className="mt-2 flex gap-3 text-gray-400">
                                    <a href="#" className="bg-gray-100 dark:bg-slate-800 p-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                    <a href="#" className="bg-gray-100 dark:bg-slate-800 p-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="h-80 lg:h-full w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg relative bg-gray-100 dark:bg-slate-800"
            >
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901090385!2d-74.00615268482497!3d40.71435287933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a1916d2880b%3A0x2a9a95729c5a15df!2sNew%20York%2C%20NY%2010013!5e0!3m2!1sen!2sus!4v1652362871632!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 grayscale-[50%] hover:grayscale-0 transition-all duration-700"
                ></iframe>
            </motion.div>
        </div>
    );
}
