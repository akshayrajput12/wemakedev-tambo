

interface JobSearchProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    locationQuery: string;
    setLocationQuery: (query: string) => void;
}

export default function JobSearch({ searchQuery, setSearchQuery, locationQuery, setLocationQuery }: JobSearchProps) {
    return (
        <div className="flex flex-col gap-6 mb-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-slate-dark dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                    Find Your Dream Job
                </h1>
                <p className="text-[#49739c] dark:text-slate-400 text-base font-normal leading-normal">
                    Browse thousands of job openings from top companies.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 w-full bg-white dark:bg-[#1e2732] p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex flex-1 items-center px-4 h-12 bg-transparent">
                    <span className="material-symbols-outlined text-slate-400 mr-3">search</span>
                    <input
                        className="w-full bg-transparent border-none focus:ring-0 text-slate-dark dark:text-white placeholder-slate-400 h-full p-0"
                        placeholder="Job title, keywords, or company"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 self-center hidden md:block"></div>
                <div className="flex flex-1 items-center px-4 h-12 bg-transparent">
                    <span className="material-symbols-outlined text-slate-400 mr-3">location_on</span>
                    <input
                        className="w-full bg-transparent border-none focus:ring-0 text-slate-dark dark:text-white placeholder-slate-400 h-full p-0"
                        placeholder="City, state, zip code, or remote"
                        type="text"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                    />
                </div>
                <button className="bg-primary hover:bg-blue-700 text-white h-12 px-8 rounded-xl font-bold transition-colors">
                    Search
                </button>
            </div>
        </div>
    );
}
