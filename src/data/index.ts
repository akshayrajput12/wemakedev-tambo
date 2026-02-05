import type { SuccessStory, Stat, TrustedCompany, Step } from '../types';




export const successStories: SuccessStory[] = [
    {
        quote: "I was skeptical at first, but TCD MultiRecruit matched me with a role that perfectly fits my skillset. The process was incredibly smooth.",
        name: "Sarah Jenkins",
        role: "Product Designer",
        initials: "SJ",
        color: "blue"
    },
    {
        quote: "As a hiring manager, time is money. This platform cut our time-to-hire by 50%. The quality of candidates is consistently impressive.",
        name: "Michael Ross",
        role: "CTO, TechFlow",
        initials: "MR",
        color: "green"
    },
    {
        quote: "The best recruitment platform I've used. The interface is clean, the job alerts are relevant, and I landed a great offer within 2 weeks.",
        name: "David Kim",
        role: "Software Engineer",
        initials: "DK",
        color: "purple"
    }
];

export const stats: Stat[] = [
    { value: "12k+", label: "Live Jobs" },
    { value: "8.5k+", label: "Companies Hiring" },
    { value: "150k+", label: "Candidates Placed" },
    { value: "24h", label: "Average Response Time" }
];

export const trustedCompanies: TrustedCompany[] = [
    { name: "Vertex", color: "blue", shape: "rounded-lg" },
    { name: "Nova", color: "purple", shape: "rounded-full" },
    { name: "Echo", color: "emerald", shape: "transform rotate-45 rounded-sm" },
    { name: "Swift", color: "orange", shape: "rounded-tr-xl rounded-bl-xl" },
    { name: "Pulse", color: "indigo", shape: "rounded-full border-4 border-indigo-300" }
];

export const steps: Step[] = [
    {
        title: "1. Create Profile",
        description: "Sign up and build your professional profile. Upload your resume and highlight your key skills to stand out.",
        icon: "person_add"
    },
    {
        title: "2. Apply for Jobs",
        description: "Browse thousands of curated job listings. Filter by location, salary, and role, then apply with one click.",
        icon: "send"
    },
    {
        title: "3. Get Hired",
        description: "Connect directly with employers, schedule interviews through our platform, and land your dream job.",
        icon: "handshake"
    }
];

