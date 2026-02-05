import { useState, useMemo, useEffect } from 'react';
import JobSearch from '../components/jobs/JobSearch';
import JobFilters from '../components/jobs/JobFilters';
import JobList from '../components/jobs/JobList';
import { fetchJobs } from '../lib/api/index';

export default function JobsPage() {
    const [allJobs, setAllJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [jobTypes, setJobTypes] = useState<string[]>([]);
    const [experienceLevels, setExperienceLevels] = useState<string[]>([]);
    const [salaryRange, setSalaryRange] = useState('Any');
    const [datePosted, setDatePosted] = useState('Any time');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;

    useEffect(() => {
        async function loadJobs() {
            try {
                // Parse URL params
                const params = new URLSearchParams(window.location.search);
                const q = params.get('q');
                const loc = params.get('loc');

                if (q) setSearchQuery(q);
                if (loc) setLocationQuery(loc);

                const data = await fetchJobs();
                if (data) setAllJobs(data);
            } catch (err) {
                console.error("Failed to fetch jobs", err);
            } finally {
                setLoading(false);
            }
        }
        loadJobs();
    }, []);

    // Reset page on filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, locationQuery, jobTypes, experienceLevels, salaryRange, datePosted]);

    const filteredJobs = useMemo(() => {
        return allJobs.filter(job => {
            // Search Query
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const title = job.title?.toLowerCase() || '';
                const company = job.company_name?.toLowerCase() || '';
                const tags = job.tags || [];

                const matchesTitle = title.includes(query);
                const matchesCompany = company.includes(query);
                const matchesTags = tags.some((tag: string) => tag.toLowerCase().includes(query));
                if (!matchesTitle && !matchesCompany && !matchesTags) return false;
            }

            // Location Query
            if (locationQuery) {
                const query = locationQuery.toLowerCase();
                if (!job.location?.toLowerCase().includes(query)) return false;
            }

            // Job Types
            if (jobTypes.length > 0) {
                if (!jobTypes.includes(job.type)) return false;
            }

            // Salary Range
            if (salaryRange !== 'Any') {
                const salaryStr = job.salary_range || '';
                const salaryParts = salaryStr.match(/(\d+)L/g);

                if (salaryParts) {
                    const jobMin = parseInt(salaryParts[0].replace('L', ''));
                    const jobMax = salaryParts.length > 1 ? parseInt(salaryParts[1].replace('L', '')) : jobMin;

                    if (salaryRange === '₹3L - ₹6L') {
                        if (jobMax < 3 || jobMin > 6) return false;
                    } else if (salaryRange === '₹6L - ₹10L') {
                        if (jobMax < 6 || jobMin > 10) return false;
                    } else if (salaryRange === '₹10L - ₹20L') {
                        if (jobMax < 10 || jobMin > 20) return false;
                    } else if (salaryRange === '₹20L+') {
                        if (jobMax < 20) return false;
                    }
                }
            }

            // Date Posted
            if (datePosted !== 'Any time') {
                const created = new Date(job.created_at);
                const now = new Date();
                const diffTime = Math.abs(now.getTime() - created.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (datePosted === 'Past 24 hours') {
                    if (diffDays > 1) return false;
                } else if (datePosted === 'Past week') {
                    if (diffDays > 7) return false;
                } else if (datePosted === 'Past month') {
                    if (diffDays > 30) return false;
                }
            }

            return true;
        });
    }, [allJobs, searchQuery, locationQuery, jobTypes, experienceLevels, salaryRange, datePosted]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const paginatedJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <div className="p-20 text-center">Loading Jobs...</div>;

    return (
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-8 mt-20">
            <div className="layout-content-container flex flex-col w-full max-w-[1280px] flex-1">
                <JobSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    locationQuery={locationQuery}
                    setLocationQuery={setLocationQuery}
                />
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <JobFilters
                        jobTypes={jobTypes}
                        setJobTypes={setJobTypes}
                        experienceLevels={experienceLevels}
                        setExperienceLevels={setExperienceLevels}
                        salaryRange={salaryRange}
                        setSalaryRange={setSalaryRange}
                        datePosted={datePosted}
                        setDatePosted={setDatePosted}
                    />
                    <JobList
                        jobs={paginatedJobs}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}
