import { useNavigate } from 'react-router-dom';
import type { Job } from '../../types/jobs';

interface JobCardProps {
    job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    const navigate = useNavigate();

    const handleCardClick = (e: React.MouseEvent) => {
        // Prevent navigation if clicking directly on a button/interactive element
        if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
            return;
        }
        navigate(`/jobs/${job.slug}`);
    };

    const isNew = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 3;
    };

    return (
        <div
            onClick={handleCardClick}
            className="group relative flex flex-col sm:flex-row gap-5 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
        >
            {/* New Badge */}
            {isNew(job.created_at) && (
                <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-xl z-10">
                    NEW
                </div>
            )}

            <div className="size-16 shrink-0 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 border border-slate-100 dark:border-slate-600 flex items-center justify-center p-2 shadow-sm">
                <img className="w-full h-full object-contain" alt={`${job.company_name} logo`} src={job.logo_url || 'https://via.placeholder.com/80'} />
            </div>

            <div className="flex flex-col flex-1 gap-1">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-tight mb-1">{job.title}</h4>
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            {job.company_name}
                            {job.is_featured && <span className="text-amber-500 material-symbols-outlined text-[14px]" title="Featured">verified</span>}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 mt-3 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-700/50 px-2.5 py-1 rounded-md border border-slate-100 dark:border-slate-700">
                        <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                        <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-700/50 px-2.5 py-1 rounded-md border border-slate-100 dark:border-slate-700">
                        <span className="material-symbols-outlined text-[16px] text-primary">payments</span>
                        <span className="font-medium text-slate-700 dark:text-slate-200">{job.salary_range}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-700/50 px-2.5 py-1 rounded-md border border-slate-100 dark:border-slate-700">
                        <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                        <span>{job.type}</span>
                    </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-700 mt-4 pt-4 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {job.tags && job.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="px-2.5 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-full">{tag}</span>
                        ))}
                        {job.tags && job.tags.length > 3 && (
                            <span className="px-2 py-1 text-slate-400 text-xs font-medium">+{job.tags.length - 3} more</span>
                        )}
                    </div>
                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1 shrink-0 ml-4">
                        <span className="material-symbols-outlined text-[14px]">history</span>
                        {new Date(job.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                </div>
            </div>

            <div className="flex flex-row sm:flex-col justify-between sm:justify-center items-center gap-3 border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-slate-700 pt-4 sm:pt-0 sm:pl-6 mt-2 sm:mt-0 min-w-[120px]">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        // Bookmark logic
                    }}
                    className="size-10 rounded-full bg-slate-50 dark:bg-slate-700/50 text-slate-400 hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center justify-center transition-all"
                >
                    <span className="material-symbols-outlined">bookmark_border</span>
                </button>
                <button className="w-full sm:w-auto h-10 px-6 rounded-xl bg-primary text-white text-sm font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center">
                    Apply
                </button>
            </div>
        </div>
    );
}
