import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useParams, Link } from 'react-router-dom';

export default function UserApplicationDetailPage() {
    const { id } = useParams();
    const [application, setApplication] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        async function loadApp() {
            if (!id) return;
            try {
                // Fetch application with job details
                const { data, error } = await supabase
                    .from('applications')
                    .select(`
                        *,
                        job:jobs (
                            id,
                            title,
                            company_name,
                            location,
                            type,
                            salary_range,
                            created_at,
                            description
                        ),
                        profile:profiles (
                            full_name,
                            avatar_url,
                            id
                        )
                    `)
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setApplication(data);

                if (data.resume_url) {
                    if (data.resume_url.startsWith('http')) {
                        setResumeUrl(data.resume_url);
                    } else {
                        const { data: signedData } = await supabase.storage.from('resumes').createSignedUrl(data.resume_url, 3600);
                        if (signedData) setResumeUrl(signedData.signedUrl);
                    }
                }
            } catch (err) {
                console.error("Error loading application", err);
            } finally {
                setLoading(false);
            }
        }
        loadApp();
    }, [id]);

    if (loading) return <div className="p-10 text-center">Loading Application...</div>;
    if (!application) return <div className="p-10 text-center">Application not found.</div>;

    const StatusBadge = ({ status }: { status: string }) => {
        const getStatusColor = (s: string) => {
            switch (s) {
                case 'interview': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
                case 'review': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
                case 'hired': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
                case 'rejected': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
                default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700';
            }
        };
        const colorClass = getStatusColor(status);
        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${colorClass}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <div className="flex-1 flex justify-center py-6 sm:py-8 px-4 sm:px-6 lg:px-8 mt-20">
            <div className="flex flex-col lg:flex-row max-w-[1280px] w-full gap-6">

                {/* Main Application View */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap gap-2 text-sm">
                        <Link to="/dashboard" className="text-slate-500 hover:text-primary dark:text-slate-400">Dashboard</Link>
                        <span className="text-slate-400">/</span>
                        <span className="font-semibold text-slate-900 dark:text-white">Application Details</span>
                    </div>

                    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-slate-200 dark:border-zinc-700 p-6 sm:p-8">
                        <div className="flex flex-col md:flex-row justify-between md:items-start gap-6 mb-8 border-b border-gray-100 dark:border-gray-700 pb-8">
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{application.job?.title}</h1>
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                    <span className="font-semibold text-primary">{application.job?.company_name}</span>
                                    <span>•</span>
                                    <span>{application.job?.location}</span>
                                    <span>•</span>
                                    <span>Applied on {new Date(application.applied_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <StatusBadge status={application.status} />
                                <span className="text-xs text-slate-400">Application ID: {application.id.slice(0, 8)}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Candidate Input */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">person</span>
                                    Your Submission
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Full Name</p>
                                        <p className="font-medium text-slate-900 dark:text-white">{application.candidate_name}</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email</p>
                                        <p className="font-medium text-slate-900 dark:text-white">{application.candidate_email}</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                                        <p className="font-medium text-slate-900 dark:text-white">{application.candidate_phone || 'N/A'}</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Experience Summary</p>
                                        <p className="font-medium text-slate-900 dark:text-white text-sm leading-relaxed">{application.experience_summary}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Resume Preview */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">description</span>
                                    Resume
                                </h3>
                                <div className="bg-slate-100 dark:bg-slate-900 rounded-lg flex flex-col h-[400px] overflow-hidden border border-slate-200 dark:border-slate-700">
                                    {resumeUrl ? (
                                        <iframe src={`${resumeUrl}#toolbar=0`} className="w-full h-full" title="Resume" />
                                    ) : (
                                        <div className="flex-1 flex items-center justify-center text-slate-400">No Resume Loaded</div>
                                    )}
                                    <div className="p-3 bg-white dark:bg-gray-800 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:underline">
                                            Download Resume
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Job Details</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="p-3 text-center bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                    <p className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase mb-1">Type</p>
                                    <p className="font-bold text-slate-900 dark:text-white">{application.job?.type}</p>
                                </div>
                                <div className="p-3 text-center bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/30">
                                    <p className="text-xs text-green-600 dark:text-green-400 font-bold uppercase mb-1">Salary</p>
                                    <p className="font-bold text-slate-900 dark:text-white">{application.job?.salary_range}</p>
                                </div>
                                <div className="p-3 text-center bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-100 dark:border-purple-900/30">
                                    <p className="text-xs text-purple-600 dark:text-purple-400 font-bold uppercase mb-1">Location</p>
                                    <p className="font-bold text-slate-900 dark:text-white">{application.job?.location}</p>
                                </div>
                                <div className="p-3 text-center bg-orange-50 dark:bg-orange-900/10 rounded-lg border border-orange-100 dark:border-orange-900/30">
                                    <p className="text-xs text-orange-600 dark:text-orange-400 font-bold uppercase mb-1">Posted</p>
                                    <p className="font-bold text-slate-900 dark:text-white">{new Date(application.job?.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-sm">
                                <Link to={`/jobs/${application.job?.id}`} className="inline-flex items-center gap-1 font-bold text-primary hover:underline">
                                    View Full Job Posting <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
