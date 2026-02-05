import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchQuery) params.append('q', searchQuery);
        if (locationQuery) params.append('loc', locationQuery);
        navigate(`/jobs?${params.toString()}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div className="relative w-full bg-slate-dark text-white">
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" data-alt="Office environment with people working on laptops"></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-dark/80 to-slate-dark"></div>
            <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col items-center justify-center px-6 py-24 lg:px-20 lg:py-32 text-center">
                <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl mb-6">
                    Find Your Dream Job with <span className="text-primary text-blue-400">TCD MultiRecruit</span>
                </h1>
                <p className="max-w-2xl text-lg text-gray-300 sm:text-xl mb-10">
                    Connecting top talent with leading companies worldwide. We simplify the hiring process so you can focus on your career journey.
                </p>
                <div className="w-full max-w-3xl rounded-xl bg-white p-2 shadow-xl dark:bg-[#1e293b]">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex flex-1 items-center px-4 py-3 sm:border-r border-gray-200 dark:border-gray-700">
                            <span className="material-symbols-outlined text-gray-400 mr-3">search</span>
                            <input
                                className="w-full bg-transparent border-none p-0 text-slate-dark dark:text-white placeholder-gray-400 focus:ring-0 text-base"
                                placeholder="Job title, keywords, or company"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="flex flex-1 items-center px-4 py-3">
                            <span className="material-symbols-outlined text-gray-400 mr-3">location_on</span>
                            <input
                                className="w-full bg-transparent border-none p-0 text-slate-dark dark:text-white placeholder-gray-400 focus:ring-0 text-base"
                                placeholder="City, state, or remote"
                                type="text"
                                value={locationQuery}
                                onChange={(e) => setLocationQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-base font-bold transition-all w-full sm:w-auto"
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="mt-8 flex gap-4 text-sm text-gray-400">
                    <span>Popular:</span>
                    <button onClick={() => navigate('/jobs?q=Designer')} className="hover:text-white underline decoration-dotted bg-transparent border-none p-0 cursor-pointer">Designer</button>
                    <button onClick={() => navigate('/jobs?q=Developer')} className="hover:text-white underline decoration-dotted bg-transparent border-none p-0 cursor-pointer">Developer</button>
                    <button onClick={() => navigate('/jobs?q=Marketing')} className="hover:text-white underline decoration-dotted bg-transparent border-none p-0 cursor-pointer">Marketing</button>
                    <button onClick={() => navigate('/jobs?q=Project Manager')} className="hover:text-white underline decoration-dotted bg-transparent border-none p-0 cursor-pointer">Project Manager</button>
                </div>
            </div>
        </div>
    );
}
