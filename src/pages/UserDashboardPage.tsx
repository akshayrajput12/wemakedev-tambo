import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';

export default function UserDashboardPage() {
    const [profile, setProfile] = useState<any>(null);
    const [applications, setApplications] = useState<any[]>([]);
    const [recommendedJobs, setRecommendedJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function loadDashboardData() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;
                setUser(user);

                // Fetch Profile
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                setProfile(profileData);

                // Fetch Applications
                const { data: applicationsData } = await supabase
                    .from('applications')
                    .select(`
                        id,
                        status,
                        applied_at,
                        job:jobs (
                            id,
                            title,
                            company_name,
                            location,
                            salary_range,
                            type
                        )
                    `)
                    .eq('user_id', user.id)
                    .order('applied_at', { ascending: false });

                if (applicationsData) setApplications(applicationsData);

                // Fetch Recommended Jobs: Random 2 from 'open' status
                const { data: jobsData } = await supabase
                    .from('jobs')
                    .select('*')
                    .eq('status', 'open');

                if (jobsData) {
                    // Randomize
                    const shuffled = jobsData.sort(() => 0.5 - Math.random());
                    setRecommendedJobs(shuffled.slice(0, 2));
                }

            } catch (error) {
                console.error("Error loading dashboard:", error);
            } finally {
                setLoading(false);
            }
        }

        loadDashboardData();
    }, []);

    if (loading) return <div className="min-h-screen pt-24 px-4 text-center">Loading Dashboard...</div>;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'interview': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
            case 'review': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
            case 'hired': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
            case 'rejected': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
            default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
        }
    };

    const StatusBadge = ({ status }: { status: string }) => {
        const colorClass = getStatusColor(status);
        const isActive = status === 'interview' || status === 'hired';
        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${colorClass}`}>
                {isActive && <span className={`size-1.5 rounded-full bg-current animate-pulse`}></span>}
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuAcEzavaaHshIObHgA1KqkcwngckSwv5gXXAUaJEIbCZ4vrr_AKgZMn1AXV0j9GHRmrh6-a-bCBZwsp44meQ020dKPqsctCDm_9_Mt-QzS08lBa4o9pDwMh8c_N40rXETD_jw63PBctPaQBHq97fVcemS6liwg7aQe0OS2oINmJuqhoNG7ToFG8beJSBydYI2aQBrZDjE1pc9Su9wD0zEJkt6Q2ud6NSwVvy03KSCEzUqe9i46IC418AAC4nZiO4zMTWSu_VdpGxqIl";

    return (
        <div className="flex-1 flex justify-center py-6 sm:py-8 px-4 sm:px-6 lg:px-8 mt-20">
            <div className="flex flex-col lg:flex-row max-w-[1200px] w-full gap-6">
                {/* Sidebar */}
                <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-4">
                    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-slate-200 dark:border-zinc-700 overflow-hidden">
                        <div className="h-16 bg-slate-200 dark:bg-zinc-700 relative">
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 size-16 rounded-full border-4 border-white dark:border-zinc-800 bg-cover bg-center" style={{ backgroundImage: `url("${avatarUrl}")` }}></div>
                        </div>
                        <div className="pt-10 pb-4 px-4 text-center border-b border-slate-200 dark:border-zinc-700">
                            <h3 className="font-bold text-slate-900 dark:text-white hover:underline cursor-pointer">{profile?.full_name || user?.user_metadata?.full_name || user?.email || user?.phone}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Open to work • {profile?.title || 'Candidate'}</p>
                        </div>
                        <nav className="flex flex-col py-2">
                            <Link to="/dashboard" className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-700/50 border-l-4 border-primary bg-primary/5">
                                <span className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[20px] text-primary">folder_shared</span>
                                    My Applications
                                </span>
                                <span className="text-slate-900 dark:text-white font-bold">{applications.length}</span>
                            </Link>
                            <Link to="/profile" className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-700/50 border-l-4 border-transparent hover:text-slate-900 dark:hover:text-white">
                                <span className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[20px]">person</span>
                                    Profile
                                </span>
                            </Link>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col gap-6 min-w-0">
                    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-slate-200 dark:border-zinc-700">
                        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-zinc-700 flex flex-wrap items-center justify-between gap-4">
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Applied Jobs</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-500 dark:text-slate-400">Filter by:</span>
                                <select className="text-sm border-none bg-slate-100 dark:bg-zinc-700 rounded px-3 py-1.5 text-slate-700 dark:text-slate-200 focus:ring-0 cursor-pointer font-medium">
                                    <option>All Statuses</option>
                                    <option>In Review</option>
                                    <option>Interviewing</option>
                                    <option>Offered</option>
                                </select>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 dark:bg-zinc-700/30 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold">
                                    <tr>
                                        <th className="px-6 py-4 rounded-tl-lg">Job Title</th>
                                        <th className="px-6 py-4">Company</th>
                                        <th className="px-6 py-4">Applied Date</th>
                                        <th className="px-6 py-4 rounded-tr-lg">Status</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-zinc-700">
                                    {applications.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                                No applications yet. Start applying!
                                            </td>
                                        </tr>
                                    ) : (
                                        applications.map((app) => (
                                            <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-zinc-700/30 transition-colors group cursor-pointer">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-10 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                                                            {app.job.company_name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <Link to={`/dashboard/applications/${app.id}`} className="font-semibold text-slate-900 dark:text-white text-sm hover:underline">{app.job.title}</Link>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400">{app.job.location} • {app.job.type}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{app.job.company_name}</td>
                                                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{new Date(app.applied_at).toLocaleDateString()}</td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={app.status || 'new'} />
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link to={`/dashboard/applications/${app.id}`} className="p-2 hover:bg-slate-200 dark:hover:bg-zinc-600 rounded-full text-slate-400 hover:text-slate-600 transition-colors inline-flex">
                                                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recommended for You</h2>
                            <Link to="/jobs" className="text-sm font-semibold text-primary hover:underline">View all</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {recommendedJobs.map((job) => (
                                <div key={job.id} className="bg-white dark:bg-zinc-800 p-5 rounded-lg shadow-sm border border-slate-200 dark:border-zinc-700 hover:shadow-md transition-shadow relative group">
                                    <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white">
                                        <span className="material-symbols-outlined text-[22px]">bookmark_border</span>
                                    </button>
                                    <div className="flex items-start gap-4 mb-3">
                                        <div className="size-12 rounded bg-red-50 flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-red-600 text-2xl">rocket_launch</span>
                                        </div>
                                        <div>
                                            <Link to={`/jobs/${job.slug}`} className="font-bold text-primary text-base hover:underline cursor-pointer block">{job.title}</Link>
                                            <p className="text-sm text-slate-700 dark:text-slate-300">{job.company_name}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{job.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="px-2 py-1 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-xs font-semibold rounded">{job.salary_range || 'Competitive'}</span>
                                        <span className="px-2 py-1 bg-slate-100 text-slate-600 dark:bg-zinc-700 dark:text-slate-300 text-xs font-medium rounded">{job.type}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                        <span className="text-green-600 dark:text-green-400 font-medium">Be an early applicant</span>
                                        <span>•</span>
                                        <span>Posted {new Date(job.posted_at || job.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
