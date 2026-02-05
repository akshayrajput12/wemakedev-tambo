import JobCard from './JobCard';
import type { Job } from '../../types/jobs';

interface JobListProps {
    jobs: Job[];
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}

export default function JobList({ jobs, currentPage = 1, totalPages = 1, onPageChange }: JobListProps) {
    return (
        <main className="flex-1 flex flex-col gap-6 ">
            <div className="flex items-center justify-between">
                <h3 className="text-slate-dark dark:text-white text-base font-bold">Showing {jobs.length} jobs</h3>
                <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-sm hidden sm:block">Sort by:</span>
                    <select className="rounded-lg border-none bg-transparent py-1 px-2 text-sm font-bold text-slate-dark dark:text-white focus:ring-0 cursor-pointer">
                        <option>Most Relevant</option>
                        <option>Newest</option>
                        <option>Highest Salary</option>
                    </select>
                </div>
            </div>

            {jobs.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 gap-4">
                        {jobs.map((job, index) => (
                            <JobCard key={job.id || index} job={job} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && onPageChange && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <button
                                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => onPageChange(page)}
                                    className={`size-10 flex items-center justify-center rounded-lg border text-sm font-bold transition-colors ${currentPage === page
                                            ? 'border-primary bg-primary text-white'
                                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-3xl text-slate-400">search_off</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-dark dark:text-white mb-1">No jobs found</h3>
                    <p className="text-slate-500 dark:text-slate-400">Try adjusting your search filters to find what you're looking for.</p>
                </div>
            )}
        </main>
    );
}
