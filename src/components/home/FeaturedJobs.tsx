import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';


export default function FeaturedJobs() {
    const [featuredJobs, setFeaturedJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Auto-scroll logic
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

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

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer || isHovered) return;

        const scrollSpeed = 1; // Pixels per frame
        let animationFrameId: number;

        const scroll = () => {
            // If scrolled to the end (or near end), loop back seamlessly if possible. 
            // For simple scroll reset:
            if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth / 2)) {
                // precise reset point depends on implementation. 
                // Since we duplicate the list, resetting to 0 when we reach halfway is a common trick 
                // BUT only if scrollWidth is exactly double. 
                // Because we triple the list, we can reset when we reach 1/3 or 2/3.
                // Let's rely on a simpler 'scroll and bounce' or 'infinite loop' logic if the list is long enough.
                // Given the complexity of perfect seamless loop in React without a library, 
                // a simple continuous scroll that wraps is best done if we have enough content.
                // For now, I'll use a simple continuous scroll that resets to 0 when it hits the "end" of the first set.
                // Resetting logic:
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 3 * 2) {
                    scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
                } else {
                    scrollContainer.scrollLeft += scrollSpeed;
                }
            } else {
                scrollContainer.scrollLeft += scrollSpeed;
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered, featuredJobs]);

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + "Y AGO";

        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + "M AGO";

        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + "D AGO";

        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + "H AGO";

        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + "M AGO";

        return "JUST NOW";
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = direction === 'left' ? -340 : 340;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (loading) return null;
    if (featuredJobs.length === 0) return null;

    // Duplicate jobs for infinite scroll effect (Triple ensures smooth reset)
    const displayJobs = [...featuredJobs, ...featuredJobs, ...featuredJobs, ...featuredJobs];

    return (
        <section className="relative w-full overflow-hidden py-32 bg-[#F9FAFB]">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] size-[800px] bg-[radial-gradient(circle_at_center,rgba(10,102,194,0.05)_0%,transparent_70%)] opacity-50"></div>
                <div className="absolute -bottom-[10%] -right-[10%] size-[800px] bg-[radial-gradient(circle_at_center,rgba(10,102,194,0.05)_0%,transparent_70%)] opacity-30"></div>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:40px_40px] opacity-50 pointer-events-none"></div>

            <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-20">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[11px] font-bold mb-6 tracking-widest uppercase">
                            <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
                            Premium Curation
                        </div>
                        <h2 className="text-5xl lg:text-6xl font-black text-[#111827] tracking-tighter leading-[0.95]">
                            Featured <br /> <span className="text-primary">Opportunities</span>
                        </h2>
                        <p className="mt-8 text-[#6B7280] text-xl leading-relaxed max-w-xl font-light">
                            Hand-picked roles from industry-leading companies vetted by our expert talent acquisition team.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={() => scroll('left')} className="group size-12 rounded-full border border-[#E5E7EB] bg-white hover:bg-primary hover:border-primary hover:text-white flex items-center justify-center transition-all duration-300">
                            <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        </button>
                        <button onClick={() => scroll('right')} className="group size-12 rounded-full border border-[#E5E7EB] bg-white hover:bg-primary hover:border-primary hover:text-white flex items-center justify-center transition-all duration-300">
                            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    </div>
                </div>

                {/* Jobs Carousel */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-8 overflow-x-auto pb-12 -mx-6 px-6 scrollbar-none"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {displayJobs.map((job, index) => (
                        <div key={`${job.id}-${index}`} className="group relative shrink-0 w-[340px] bg-white border border-primary/30 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05),0_4px_6px_-4px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(10,102,194,0.1)] hover:border-primary hover:-translate-y-1 rounded-[2rem] p-8 flex flex-col">
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-8">
                                <div className="size-16 rounded-2xl bg-white border border-[#E5E7EB] p-3 flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-110 transition-transform duration-500">
                                    {job.logo_url ? (
                                        <img src={job.logo_url} alt={job.company_name} className="w-full h-full object-contain" />
                                    ) : (
                                        <span className="text-2xl font-bold text-gray-400">{job.company_name?.charAt(0)}</span>
                                    )}
                                </div>
                                {new Date(job.posted_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 ? (
                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest">
                                        <span className="material-symbols-outlined text-xs">local_fire_department</span>
                                        Hot Drop
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] text-[#6B7280] text-[10px] font-black uppercase tracking-widest">
                                        New Post
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-primary font-mono text-[10px] uppercase tracking-widest font-bold">{job.company_name}</span>
                                    <span className="text-[#E5E7EB]">•</span>
                                    <span className="text-[#6B7280] text-[10px] font-mono">{getTimeAgo(job.posted_at)}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-[#111827] group-hover:text-primary transition-colors leading-tight line-clamp-2">
                                    {job.title}
                                </h3>

                                <div className="mt-8 grid grid-cols-2 gap-4 border-y border-[#E5E7EB] py-6">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1 block">Salary</span>
                                        <span className="text-sm font-bold text-[#111827]">{job.salary_range}</span>
                                    </div>
                                    <div>
                                        <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1 block">Loc.</span>
                                        <span className="text-sm font-bold text-[#111827] truncate block">{job.location}</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    <span className="px-3 py-1 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-[10px] font-bold text-[#6B7280] uppercase tracking-tighter">
                                        {job.type}
                                    </span>
                                    <span className="px-3 py-1 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-[10px] font-bold text-[#6B7280] uppercase tracking-tighter">
                                        {job.experience_level || job.level || 'Mid'}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-10">
                                <Link to={`/jobs/${job.slug}`} className="relative flex items-center justify-between w-full bg-primary text-white px-6 py-4 rounded-xl font-bold transition-all duration-500 hover:bg-[#004182] hover:scale-[1.01] active:scale-95 shadow-lg shadow-primary/20 group/btn">
                                    Apply Now
                                    <div className="flex items-center justify-center size-8 rounded-full bg-white/20 text-white transition-transform duration-500 group-hover/btn:rotate-[-45deg] group-hover/btn:bg-white group-hover/btn:text-primary">
                                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
