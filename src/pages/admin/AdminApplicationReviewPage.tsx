import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchApplicationById, updateApplicationStatus } from '../../lib/api/index';
import { supabase } from '../../lib/supabaseClient';

export default function AdminApplicationReviewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        async function loadApp() {
            if (!id) return;
            try {
                const data = await fetchApplicationById(id);
                setApplication(data);
                if (data.resume_url) {
                    // Get a signed URL or public URL depending on bucket privacy
                    // Since we made bucket private, we need signed URL
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

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        if (!application) return;
        try {
            await updateApplicationStatus(application.id, newStatus);
            setApplication({ ...application, status: newStatus });
            // Status updated silently
        } catch (err) {
            console.error("Failed to update status", err);
            alert("Failed to update status");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!application) return <div>Application not found</div>;

    const notes = [
        // Placeholder notes until we implement notes in DB or use the jsonb column
        { initial: "sys", user: "System", time: "Now", text: "Application received.", color: "gray" },
    ];

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark">
            <div className="flex-1 overflow-y-auto p-6 md:p-10">
                <main className="layout-container flex h-full grow flex-col max-w-[1440px] mx-auto w-full px-0">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap gap-2 px-0 py-2 mb-4">
                        <Link to="/admin/applications" className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:underline">Candidates</Link>
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">/</span>
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium hover:underline">{application.jobs?.title}</span>
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">/</span>
                        <span className="text-slate-900 dark:text-white text-sm font-medium">Application Review</span>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                        {/* Main Column (Candidate Info) */}
                        <div className="xl:col-span-8 flex flex-col gap-6">
                            {/* Profile Header Card */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                                {/* Page Heading Section inside Card */}
                                <div className="flex flex-wrap justify-between gap-3 p-6 border-b border-slate-100 dark:border-slate-800">
                                    <div className="flex flex-col gap-1">
                                        <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">Application Review</h1>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-normal">{application.jobs?.title || 'Job Title'} - ID: #{application.id.slice(0, 8)}</p>
                                    </div>
                                    <button onClick={() => navigate('/admin/applications')} className="flex items-center justify-center rounded-lg h-9 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                        <span className="material-symbols-outlined text-[18px] mr-2">arrow_back</span>
                                        <span className="truncate">Back to List</span>
                                    </button>
                                </div>
                                {/* Candidate Profile Info */}
                                <div className="p-6">
                                    <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between md:items-start">
                                        <div className="flex gap-5">
                                            {/* Note: We aren't fetching profile image yet, so this will default to initials */}
                                            {application.profiles?.avatar_url ? (
                                                <div className="bg-center bg-no-repeat bg-cover rounded-full h-24 w-24 border-4 border-slate-50 dark:border-slate-800 shadow-md" style={{ backgroundImage: `url('${application.profiles.avatar_url}')` }}></div>
                                            ) : (
                                                <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-24 w-24 border-4 border-slate-50 dark:border-slate-800 shadow-md flex items-center justify-center text-2xl font-bold text-slate-500 dark:text-slate-400">
                                                    {application.candidate_name ? application.candidate_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2) : '??'}
                                                </div>
                                            )}

                                            <div className="flex flex-col justify-center">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p className="text-slate-900 dark:text-white text-2xl font-bold leading-tight">{application.candidate_name}</p>
                                                    <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-600/20">Active</span>
                                                </div>
                                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-1 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                                                    {application.candidate_location || 'Remote'} • Applied {new Date(application.applied_at || application.created_at).toLocaleDateString()}
                                                </p>
                                                <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[16px]">school</span>
                                                    Experience: {application.experience_summary}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="flex flex-1 md:flex-auto items-center justify-center rounded-xl h-10 px-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                                <span className="material-symbols-outlined text-[20px] mr-2">download</span>
                                                Resume
                                            </a>
                                            <button className="flex flex-1 md:flex-auto items-center justify-center rounded-xl h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm">
                                                <span className="material-symbols-outlined text-[20px] mr-2">mail</span>
                                                Contact
                                            </button>
                                        </div>
                                    </div>
                                    {/* Social Actions Bar */}
                                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Social Presence</p>
                                        <div className="flex flex-wrap gap-4">
                                            {['LinkedIn', 'GitHub', 'Portfolio', 'Twitter'].map((social, idx) => (
                                                <a key={social} className="group flex flex-col items-center gap-2 min-w-[70px]" href="#">
                                                    <div className={`rounded-full bg-slate-100 dark:bg-slate-800 p-3 transition-all ${idx === 0 ? 'group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-primary' : 'group-hover:bg-slate-200 dark:group-hover:bg-slate-700'}`}>
                                                        <span className="material-symbols-outlined text-[24px]">
                                                            {idx === 0 ? 'work' : idx === 1 ? 'code' : idx === 2 ? 'language' : 'alternate_email'}
                                                        </span>
                                                    </div>
                                                    <p className="text-slate-700 dark:text-slate-300 text-xs font-medium">{social}</p>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Screening Questions */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary">
                                        <span className="material-symbols-outlined">quiz</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Screening Questions</h3>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Why are you interested in this role?</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                            I've been following TCD's growth in the fintech sector for years. The combination of React and Rust in your tech stack is exactly where I want to deepen my expertise.
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Are you authorized to work in the US?</p>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-green-600 text-[20px]">check_circle</span>
                                            <p className="text-sm text-slate-600 dark:text-slate-300">Yes, I am a US Citizen.</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">What are your salary expectations?</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                            $140,000 - $160,000 base.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* PDF Viewer Component */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-[800px] overflow-hidden">
                                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                                    <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-red-500">picture_as_pdf</span>
                                        Resume_{application.candidate_name.replace(/\s+/g, '_')}.pdf
                                    </h3>
                                    <div className="flex gap-2">
                                        <a
                                            href={resumeUrl}
                                            download={`Resume_${application.candidate_name.replace(/\s+/g, '_')}.pdf`}
                                            className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500 flex items-center justify-center"
                                            title="Download original"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">download</span>
                                        </a>
                                        <a
                                            href={resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500 flex items-center justify-center"
                                            title="Open in new tab"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="flex-1 bg-slate-200 dark:bg-slate-950 p-0 overflow-hidden flex justify-center items-center">
                                    {resumeUrl ? (
                                        <iframe
                                            src={`${resumeUrl}#toolbar=0`}
                                            className="w-full h-full border-none"
                                            title="Resume Preview"
                                        />
                                    ) : (
                                        <div className="text-slate-500 flex flex-col items-center gap-2">
                                            <span className="material-symbols-outlined text-4xl">description</span>
                                            <span>Loading PDF...</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar (Controls) */}
                        <div className="xl:col-span-4 flex flex-col gap-6 sticky top-24">

                            {/* Job Details Card */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                                <div className="flex items-center gap-3 mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                                    <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-blue-600">work</span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{application.jobs?.title}</h3>
                                        <p className="text-xs text-slate-500">{application.jobs?.company_name}</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500">Location</span>
                                        <span className="font-medium text-slate-700 dark:text-slate-300">{application.jobs?.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500">Type</span>
                                        <span className="font-medium text-slate-700 dark:text-slate-300">{application.jobs?.type}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500">Salary</span>
                                        <span className="font-medium text-slate-700 dark:text-slate-300">{application.jobs?.salary_range}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-slate-500">Posted</span>
                                        <span className="font-medium text-slate-700 dark:text-slate-300">
                                            {application.jobs?.created_at ? new Date(application.jobs.created_at).toLocaleDateString() : '-'}
                                        </span>
                                    </div>
                                </div>
                                <Link to={`/jobs/${application.jobs?.id}`} className="mt-4 block w-full text-center text-xs font-bold text-primary hover:underline">
                                    View Full Job Description
                                </Link>
                            </div>

                            {/* Application Status Card */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Application Status</h3>
                                <div className="relative">
                                    <select
                                        className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-base rounded-lg focus:ring-primary focus:border-primary block p-3 pr-10"
                                        value={application.status}
                                        onChange={handleStatusChange}
                                    >
                                        <option value="new">New</option>
                                        <option value="review">Review</option>
                                        <option value="interview">Interview</option>
                                        <option value="hired">Hired</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                                        <span className="material-symbols-outlined">expand_more</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-[16px]">history</span>
                                    Last updated 2 hours ago by Sarah J.
                                </div>
                            </div>

                            {/* Recruiter Notes Card */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col h-auto max-h-[600px]">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recruiter Notes</h3>
                                    <button className="text-primary hover:text-primary/80 text-sm font-medium">Clear</button>
                                </div>
                                <div className="mb-4">
                                    <textarea className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-primary focus:border-primary min-h-[100px] resize-y" placeholder="Add a private note..."></textarea>
                                    <button className="mt-2 w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium py-2 rounded-lg text-sm transition-colors">
                                        Add Note
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                                    {notes.map((note, index) => (
                                        <div key={index} className="flex gap-3 items-start">
                                            <div className={`size-8 rounded-full bg-${note.color}-100 dark:bg-${note.color}-900/30 text-${note.color}-600 dark:text-${note.color}-400 flex items-center justify-center shrink-0`}>
                                                <span className="text-xs font-bold">{note.initial}</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{note.user}</p>
                                                    <span className="text-xs text-slate-500">{note.time}</span>
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-slate-300">{note.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex gap-3 items-start opacity-60">
                                        <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">System</p>
                                                <span className="text-xs text-slate-500">2d ago</span>
                                            </div>
                                            <p className="text-sm text-slate-600 dark:text-slate-300 italic">Application received from Job Board #1.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium py-3 rounded-xl text-sm transition-colors shadow-sm">
                                    <span className="material-symbols-outlined text-[20px] text-red-500">block</span>
                                    Reject
                                </button>
                                <button className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl text-sm transition-colors shadow-sm">
                                    <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
                                    Schedule
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
