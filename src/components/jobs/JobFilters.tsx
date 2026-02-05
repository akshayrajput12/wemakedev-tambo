

interface JobFiltersProps {
    jobTypes: string[];
    setJobTypes: (types: string[]) => void;
    experienceLevels: string[];
    setExperienceLevels: (levels: string[]) => void;
    salaryRange: string;
    setSalaryRange: (range: string) => void;
    datePosted: string;
    setDatePosted: (date: string) => void;
}

export default function JobFilters({
    jobTypes,
    setJobTypes,
    experienceLevels,
    setExperienceLevels,
    salaryRange,
    setSalaryRange,
    datePosted,
    setDatePosted
}: JobFiltersProps) {

    const handleJobTypeChange = (type: string) => {
        if (jobTypes.includes(type)) {
            setJobTypes(jobTypes.filter(t => t !== type));
        } else {
            setJobTypes([...jobTypes, type]);
        }
    };

    const handleExperienceChange = (level: string) => {
        if (experienceLevels.includes(level)) {
            setExperienceLevels(experienceLevels.filter(l => l !== level));
        } else {
            setExperienceLevels([...experienceLevels, level]);
        }
    };

    return (
        <aside className="w-full lg:w-1/4 min-w-[280px] shrink-0">
            <div className="flex flex-col gap-6 sticky top-24">
                <div className="flex items-center justify-between">
                    <h3 className="text-slate-dark dark:text-white text-lg font-bold">Filters</h3>
                    <button
                        onClick={() => {
                            setJobTypes([]);
                            setExperienceLevels([]);
                            setSalaryRange('Any');
                            setDatePosted('Any time');
                        }}
                        className="text-primary text-sm font-medium hover:underline"
                    >
                        Clear all
                    </button>
                </div>

                {/* Job Type Filter */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-slate-dark dark:text-white text-sm font-bold">Job Type</h4>
                    <div className="flex flex-col gap-2">
                        {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                            <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                                    type="checkbox"
                                    checked={jobTypes.includes(type)}
                                    onChange={() => handleJobTypeChange(type)}
                                />
                                <span className="text-slate-600 dark:text-slate-300 text-sm group-hover:text-slate-dark dark:group-hover:text-white">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="h-px bg-slate-200 dark:bg-slate-700 w-full"></div>

                {/* Experience Level */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-slate-dark dark:text-white text-sm font-bold">Experience Level</h4>
                    <div className="flex flex-col gap-2">
                        {['Entry Level', 'Mid Level', 'Senior Level', 'Director'].map((level) => (
                            <label key={level} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                                    type="checkbox"
                                    checked={experienceLevels.includes(level)}
                                    onChange={() => handleExperienceChange(level)}
                                />
                                <span className="text-slate-600 dark:text-slate-300 text-sm group-hover:text-slate-dark dark:group-hover:text-white">{level}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="h-px bg-slate-200 dark:bg-slate-700 w-full"></div>

                {/* Salary Range */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-slate-dark dark:text-white text-sm font-bold">Salary Range</h4>
                    <div className="flex flex-col gap-2">
                        {['Any', '₹3L - ₹6L', '₹6L - ₹10L', '₹10L - ₹20L', '₹20L+'].map((range) => (
                            <label key={range} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    className="w-5 h-5 border-slate-300 text-primary focus:ring-primary"
                                    name="salary"
                                    type="radio"
                                    checked={salaryRange === range}
                                    onChange={() => setSalaryRange(range)}
                                />
                                <span className="text-slate-600 dark:text-slate-300 text-sm group-hover:text-slate-dark dark:group-hover:text-white">{range}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="h-px bg-slate-200 dark:bg-slate-700 w-full"></div>

                {/* Date Posted */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-slate-dark dark:text-white text-sm font-bold">Date Posted</h4>
                    <select
                        className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm py-2 px-3 focus:ring-primary focus:border-primary"
                        value={datePosted}
                        onChange={(e) => setDatePosted(e.target.value)}
                    >
                        <option>Any time</option>
                        <option>Past 24 hours</option>
                        <option>Past week</option>
                        <option>Past month</option>
                    </select>
                </div>
            </div>
        </aside>
    );
}
