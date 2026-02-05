import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FeaturedJobs() {
    const [featuredJobs, setFeaturedJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function loadFeaturedJobs() {
            try {
                const { data } = await supabase
                    .from('jobs')
                    .select('*')
                    .eq('status', 'open')
                    .eq('is_featured', true)
                    .order('posted_at', { ascending: false });

                if (data) setFeaturedJobs(data);
            } catch (err) {
                console.error("Failed to load featured jobs", err);
            } finally {
                setLoading(false);
            }
        }
        loadFeaturedJobs();
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = direction === 'left' ? -420 : 420;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (loading) return null;
    if (featuredJobs.length === 0) return null;

    return (
        <section className="relative w-full py-20 bg-[#101922] overflow-hidden selection:bg-primary selection:text-white">
            {/* Background Noise/Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            {/* Ambient Glows - aligned with primary */}
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-8">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-3 py-1 mb-3 text-[10px] font-mono font-bold uppercase tracking-widest text-primary border border-primary/30 rounded-full bg-primary/10"
                        >
                            Hot Drops
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight"
                        >
                            FEATURED <br className="hidden md:block" />
                            <span className="text-primary">POSITIONS.</span>
                        </motion.h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={() => scroll('left')} className="group size-12 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300">
                            <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        </button>
                        <button onClick={() => scroll('right')} className="group size-12 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300">
                            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-5 overflow-x-auto pb-8 -mx-6 px-6 snap-x snap-mandatory scrollbar-none"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {featuredJobs.map((job, index) => (
                        <motion.div
                            key={job.id}
                            className="snap-start shrink-0"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <Link
                                to={`/jobs/${job.slug}`}
                                className="group relative block w-[280px] md:w-[320px] h-[380px] bg-[#111827] rounded-3xl border border-white/10 overflow-hidden hover:border-primary/50 transition-colors duration-500"
                            >
                                {/* Gradient Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Card Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                                    {/* Top Section */}
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="size-12 rounded-xl bg-white/5 border border-white/10 p-2.5 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                                                {job.logo_url ? (
                                                    <img src={job.logo_url} alt={job.company_name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                ) : (
                                                    <span className="text-lg font-bold text-white group-hover:text-black">{job.company_name.charAt(0)}</span>
                                                )}
                                            </div>
                                            <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-medium text-white/70 backdrop-blur-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                                                {job.type}
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-bold text-white leading-tight mb-1.5 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                            {job.title}
                                        </h3>
                                        <p className="text-white/50 font-medium text-xs">{job.company_name}</p>
                                    </div>

                                    {/* Middle Section - Stats */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/10 transition-all">
                                            <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Salary</span>
                                            <span className="text-xs font-bold text-white">{job.salary_range}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/10 transition-all">
                                            <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Exp.</span>
                                            <span className="text-xs font-bold text-white">{job.level || 'Mid-Senior'}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/10 transition-all">
                                            <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">Loc.</span>
                                            <span className="text-xs font-bold text-white truncate max-w-[120px] text-right">{job.location}</span>
                                        </div>
                                    </div>

                                    {/* Bottom - Action */}
                                    <div className="flex items-center gap-2 pt-4 mt-1 border-t border-white/5">
                                        <span className="flex-1 h-10 rounded-full bg-white text-black text-sm font-bold flex items-center justify-center origin-left scale-x-95 group-hover:scale-x-100 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                            Apply Now
                                        </span>
                                        <span className="size-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-white group-hover:-rotate-45 transition-all duration-300">
                                            <span className="material-symbols-outlined text-lg">arrow_outward</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
