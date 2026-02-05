

export default function CallToAction() {
    return (
        <section className="mx-auto w-full max-w-[1440px] px-6 py-12 lg:px-20 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-2">
                <div className="relative overflow-hidden rounded-2xl bg-[#0A66C2] p-8 sm:p-12 text-white">
                    <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-black/10 blur-3xl"></div>
                    <div className="relative z-10 flex h-full flex-col justify-between items-start gap-6">
                        <div>
                            <span className="mb-4 inline-block rounded-lg bg-white/20 px-3 py-1 text-sm font-medium">For Candidates</span>
                            <h3 className="text-3xl font-bold">Ready for your next big move?</h3>
                            <p className="mt-4 max-w-md text-blue-100">Create your profile, upload your resume, and let top companies find you. It's time to advance your career.</p>
                        </div>
                        <button className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#0A66C2] shadow-lg transition-transform hover:scale-105">
                            Find Jobs
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
                <div className="relative overflow-hidden rounded-2xl bg-slate-dark p-8 sm:p-12 text-white">
                    <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-[#0A66C2]/20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>
                    <div className="relative z-10 flex h-full flex-col justify-between items-start gap-6">
                        <div>
                            <span className="mb-4 inline-block rounded-lg bg-white/10 px-3 py-1 text-sm font-medium">For Employers</span>
                            <h3 className="text-3xl font-bold">Hire the best talent</h3>
                            <p className="mt-4 max-w-md text-gray-400">Post your job openings to millions of candidates. Use our advanced tools to screen and hire faster.</p>
                        </div>
                        <button className="flex items-center gap-2 rounded-xl bg-[#0A66C2] px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:bg-[#0A66C2]/90 hover:scale-105">
                            Post a Job
                            <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
