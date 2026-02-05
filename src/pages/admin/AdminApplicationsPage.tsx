import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchApplications } from '../../lib/api/index';

export default function AdminApplicationsPage() {
    const [allApplications, setAllApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadApplications() {
            try {
                const data = await fetchApplications();
                setAllApplications(data || []);
            } catch (err) {
                console.error("Failed to load applications", err);
            } finally {
                setLoading(false);
            }
        }
        loadApplications();
    }, []);

    if (loading) return <div className="p-10 text-center">Loading Applications...</div>;

    return (
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">Application Tracker</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-base font-normal">Manage and review all candidate applications across roles.</p>
                    </div>
                    {/* ... (Export button removed or kept as placeholder) ... */}
                </div>

                {/* Filters (Can be wired up later) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white dark:bg-[#16202a] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    {/* ... filters ... */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">Status</label>
                        <select className="h-11 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-700 dark:text-slate-200 focus:border-primary focus:ring-primary">
                            <option>All Statuses</option>
                            <option>new</option>
                            <option>review</option>
                            <option>interview</option>
                            <option>hired</option>
                            <option>rejected</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="bg-white dark:bg-[#16202a] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-[#1f2b37] border-b border-slate-200 dark:border-slate-700">
                                        <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Candidate Name</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Job Applied For</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Experience</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                        <th className="py-4 px-6 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                    {allApplications.map((app) => (
                                        <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-xs ring-1 ring-slate-200 dark:ring-slate-700">
                                                        {app.candidate_name ? app.candidate_name.split(' ').map((n: any) => n[0]).join('') : 'U'}
                                                    </div>
                                                    <div className="font-medium text-slate-900 dark:text-white">{app.candidate_name || 'Guest'}</div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300">{app.jobs?.title || 'Unknown Job'}</td>
                                            <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-300">{app.experience_summary || 'N/A'}</td>
                                            <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400">{new Date(app.applied_at || app.created_at).toLocaleDateString()}</td>
                                            <td className="py-4 px-6">
                                                <StatusSelect status={app.status} />
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <Link to={`/admin/applications/${app.id}`} className="text-primary hover:underline text-sm font-bold">View Profile</Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {allApplications.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="p-8 text-center text-slate-500">No applications found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatusSelect({ status }: { status: string }) {
    const getColor = (s: string) => {
        switch (s) {
            case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500';
            case 'review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
            case 'interview': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500';
            case 'hired': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500';
            case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border-none ring-0 ${getColor(status)}`}>
            {status.toUpperCase()}
        </span>
    );
}
