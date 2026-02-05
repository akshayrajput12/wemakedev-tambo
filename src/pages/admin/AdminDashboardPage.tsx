import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllJobsAdmin } from '../../lib/api/index';

export default function AdminDashboardPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadJobs() {
            try {
                const data = await fetchAllJobsAdmin();
                setJobs(data || []);
            } catch (err) {
                console.error("Error loading jobs", err);
            } finally {
                setLoading(false);
            }
        }
        loadJobs();
    }, []);

    // Derived state for filtered jobs
    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div className="flex-1 p-6 md:p-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">Job Management</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-base font-normal">Manage and track all your active job listings.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/admin/jobs/create" className="flex items-center justify-center rounded-xl h-10 px-4 bg-primary text-white hover:bg-primary/90 transition-colors gap-2 text-sm font-bold shadow-sm shadow-primary/20">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                            <span className="truncate">Post New Job</span>
                        </Link>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#16202a] border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" style={{ fontSize: '20px' }}>search</span>
                        <input
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#1f2b37] border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary dark:text-white"
                            placeholder="Search jobs, companies..."
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    {/* ... (filters remain similar) */}
                </div>

                <div className="bg-white dark:bg-[#16202a] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-[#1f2b37] border-b border-slate-200 dark:border-slate-700">
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Job Title & Company</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Location</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Applicants</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date Posted</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {filteredJobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 dark:text-white">{job.title}</span>
                                                <span className="text-xs text-slate-500 dark:text-slate-400">{job.company_name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300">
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-slate-400" style={{ fontSize: '16px' }}>location_on</span>
                                                {job.location}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {/* Placeholder for applicant count logic */}
                                            <span className="text-sm font-semibold text-slate-900 dark:text-white">-</span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400">{new Date(job.created_at).toLocaleDateString()}</td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${job.status === 'open' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' : 'bg-gray-100 text-gray-800'}`}>
                                                {job.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link to={`/jobs/${job.slug}`} className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="View Details">
                                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>visibility</span>
                                                </Link>
                                                <Link to={`/admin/jobs/edit/${job.slug}`} className="p-1.5 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Edit Job">
                                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                                                </Link>
                                                <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete Job">
                                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
