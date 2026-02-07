import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram, MapPin } from "lucide-react";

// TCD Data matching the requested structure
const footerLinks = {
    capabilities: [
        { label: "Find Jobs", href: "/jobs" },
        { label: "For Employers", href: "/auth" },
        { label: "Career Advice", href: "/about" },
        { label: "Consultation", href: "/contact" }
    ],
    quickLinks: [
        { label: "About Us", href: "/about" },
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Help Center", href: "/contact" }
    ],
    socials: [
        { label: "LinkedIn", href: "#" },
        { label: "Twitter", href: "#" },
        { label: "Instagram", href: "#" }
    ]
};

const contactDetails = {
    address: "123 Tech Park, Silicon Valley, CA",
    email: "contact@tcdmultirecruit.com",
    phone: "+1 (555) 123-4567"
};

export default function Footer() {
    return (
        <footer className="relative h-auto md:min-h-[80vh] flex flex-col justify-end bg-slate-900 text-white overflow-hidden z-20 mt-20">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                    alt="Corporate Building"
                    className="w-full h-full object-cover grayscale opacity-20 dark:opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/90"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12 flex flex-col h-full justify-between flex-grow">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 border-b border-white/10 pb-16">
                    {/* Links Section */}
                    <div className="w-full lg:w-[60%] flex flex-col md:flex-row gap-8 justify-between">
                        {/* Capabilities Column */}
                        <div className="flex-1">
                            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-6">Capabilities</h4>
                            <ul className="space-y-4">
                                {footerLinks.capabilities.map((item) => (
                                    <li key={item.label} className="group flex items-center">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        <Link
                                            to={item.href}
                                            className="text-base font-light text-white/80 hover:text-primary transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links Column */}
                        <div className="flex-1">
                            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-6">Quick Links</h4>
                            <ul className="space-y-4">
                                {footerLinks.quickLinks.map((item) => (
                                    <li key={item.label} className="group flex items-center">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        <Link
                                            to={item.href}
                                            className="text-base font-light text-white/80 hover:text-primary transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact & Socials Column */}
                        <div className="flex-1">
                            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-6">Global Presence</h4>
                            <div className="flex flex-col gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">US Office</span>
                                            <p className="text-sm font-light text-white/70 leading-relaxed">{contactDetails.address}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">India Office</span>
                                            <p className="text-sm font-light text-white/70 leading-relaxed">Financial District, Mumbai, India</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/5 space-y-2 text-sm font-light text-white/70">
                                    <p className="flex items-center gap-2"><span className="text-white/30">E:</span> {contactDetails.email}</p>
                                    <p className="flex items-center gap-2"><span className="text-white/30">T:</span> {contactDetails.phone}</p>
                                </div>

                                <div className="flex gap-4">
                                    {footerLinks.socials.map((social) => {
                                        const Icon = social.label === "LinkedIn" ? Linkedin : social.label === "Twitter" ? Twitter : Instagram;
                                        return (
                                            <Link
                                                key={social.label}
                                                to={social.href}
                                                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 hover:border-white transition-all duration-300 group"
                                                aria-label={social.label}
                                            >
                                                <Icon className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="w-full lg:w-[40%] flex flex-col justify-center lg:pl-16 border-l-0 lg:border-l border-white/10 pt-8 lg:pt-0">
                        <h2 className="font-sans font-bold text-3xl md:text-5xl lg:text-6xl leading-none mb-8 tracking-tighter">
                            SECURE YOUR<br />
                            <span className="text-primary italic font-light">FUTURE POSITION</span>
                        </h2>
                        <div className="flex flex-col items-start">
                            <Link to="/contact">
                                <button className="bg-primary text-white text-xs md:text-sm font-bold px-8 py-4 tracking-widest uppercase hover:bg-white hover:text-slate-900 hover:scale-105 transition-all duration-300">
                                    Book Consultancy
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar & Big Logo */}
                <div className="relative overflow-hidden pt-8 md:pt-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-white/30 text-[9px] md:text-[10px] uppercase tracking-[0.2em] mb-8">
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-4 md:mb-0">
                            <div className="flex items-center gap-2">
                                <img src="/logo.png" alt="TCD Logo" className="w-6 h-6 object-contain" />
                                <span>© 2024 TCD MultiRecruit</span>
                            </div>
                            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Protocol</Link>
                            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                        </div>
                        <div className="flex gap-4">
                            <span>HQ: Silicon Valley, USA</span>
                            <span className="text-white/10">|</span>
                            <span>APAC: Mumbai, IN</span>
                        </div>
                    </div>
                    {/* Full Logo Text - No Crop */}
                    <div className="flex justify-center w-full">
                        <h1 className="font-sans font-extrabold text-[12vw] leading-none tracking-[-0.05em] text-white/5 select-none pointer-events-none uppercase text-center w-full">
                            TCD MultiRecruit
                        </h1>
                    </div>
                </div>
            </div>
        </footer>
    );
}
