export interface Job {
    id: string;
    slug: string;
    title: string;
    company_name: string;
    company_industry?: string;
    company_size?: string;
    company_description?: string;
    company_location?: string;
    logo_url?: string;
    banner_url?: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    salary_range?: string;
    status: 'open' | 'closed' | 'draft';
    level?: string;
    deadline?: string;
    job_code?: string;
    description: string;
    responsibilities?: string;
    requirements?: string;
    benefits?: string;
    tags?: string[];
    is_featured: boolean;
    created_at: string;
    posted_at?: string;
}
