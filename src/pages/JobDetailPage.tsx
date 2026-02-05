import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchJobBySlug } from '../lib/api/index';

export default function JobDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [job, setJob] = useState<any>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadJob() {
            if (!slug) return;
            try {
                const data = await fetchJobBySlug(slug);
                setJob(data);
            } catch (err) {
                console.error("Job not found", err);
            } finally {
                setLoading(false);
            }
        }
        loadJob();
    }, [slug]);

    if (loading) return <div className="p-20 text-center">Loading...</div>;

    if (!job) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-dark dark:text-white mb-2">Job Not Found</h2>
                    <Link to="/jobs" className="text-primary hover:underline">Return to Jobs</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-10 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                <Link to="/jobs" className="hover:text-primary transition-colors">Jobs</Link>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                <span className="text-slate-800 dark:text-white font-medium">{job.title}</span>
            </nav>

            {/* Page Header */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700 mb-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex gap-6">
                        <div className="size-16 md:size-20 shrink-0 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center border border-slate-200 dark:border-slate-600 overflow-hidden">
                            <img src={job.logo_url || 'https://via.placeholder.com/150'} alt={job.company_name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-[#0d141c] dark:text-white">{job.title}</h1>
                            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-slate-500 dark:text-slate-400 text-sm font-medium">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[18px]">business</span> {job.company_name}
                                </span>
                                <span className="hidden md:inline w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[18px]">location_on</span> {job.location || job.company_location}
                                </span>
                                <span className="hidden md:inline w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[18px]">schedule</span> {job.type}
                                </span>
                                {job.location && job.location.toLowerCase().includes('remote') && (
                                    <>
                                        <span className="hidden md:inline w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wider">
                                            Remote Friendly
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-2 md:mt-0 w-full md:w-auto">
                        <button className="flex-1 md:flex-none h-10 px-4 flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">bookmark_border</span>
                            <span>Save</span>
                        </button>
                        <button className="flex-1 md:flex-none h-10 px-4 flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">share</span>
                            <span>Share</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Job Description */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    {/* Overview */}
                    <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="text-xl font-bold text-[#0d141c] dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">description</span> Job Overview
                        </h3>
                        <div
                            className="text-slate-600 dark:text-slate-300 ck-content"
                            dangerouslySetInnerHTML={{ __html: job.description }}
                        />
                    </section>

                    {/* Responsibilities */}
                    <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="text-xl font-bold text-[#0d141c] dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">task_alt</span> Responsibilities
                        </h3>
                        <div
                            className="text-slate-600 dark:text-slate-300 ck-content"
                            dangerouslySetInnerHTML={{ __html: job.responsibilities }}
                        />
                    </section>

                    {/* Requirements */}
                    <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="text-xl font-bold text-[#0d141c] dark:text-white mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">verified</span> Requirements
                        </h3>
                        <div
                            className="text-slate-600 dark:text-slate-300 ck-content text-base"
                            dangerouslySetInnerHTML={{ __html: job.requirements }}
                        />
                    </section>

                    {/* Benefits - Optional check since schema might not have it or it's new */}
                    {job.benefits && (
                        <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                            <h3 className="text-xl font-bold text-[#0d141c] dark:text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">redeem</span> Benefits & Perks
                            </h3>
                            <div
                                className="text-slate-600 dark:text-slate-300 ck-content"
                                dangerouslySetInnerHTML={{ __html: job.benefits }}
                            />
                        </section>
                    )}
                </div>

                {/* Right Column: Sidebar */}
                <aside className="relative lg:col-span-1 space-y-6">
                    {/* Apply Card (Sticky) */}
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
                            <Link
                                to={`/jobs/${job.slug}/apply`}
                                className="w-full flex items-center justify-center h-12 rounded-xl bg-primary text-white text-base font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none transition-all transform active:scale-[0.98]"
                            >
                                Apply Now
                            </Link>
                            <p className="text-center text-xs text-slate-500 mt-3">Apply before: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                            <hr className="my-6 border-slate-100 dark:border-slate-700" />
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-sm">Salary Range</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">{job.salary_range}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-sm">Experience</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">Mid-Senior</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-sm">Posted</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">{new Date(job.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-sm">Job ID</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">#{job.id.slice(0, 8)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Company Info */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="size-12 rounded-lg bg-slate-900 text-white flex items-center justify-center overflow-hidden">
                                    <img src={job.logo_url || 'https://via.placeholder.com/100'} alt={job.company_name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#0d141c] dark:text-white">{job.company_name}</h4>
                                    <p className="text-xs text-slate-500">{job.company_industry} • {job.company_size}</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                                {job.company_description}
                            </p>
                            <Link to="#" className="inline-flex items-center text-primary text-sm font-bold hover:underline">
                                View Company Profile <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
