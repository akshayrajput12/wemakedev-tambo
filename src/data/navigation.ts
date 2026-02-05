import type { NavLink, FooterSection } from '../types';

export const headerLinks: NavLink[] = [
    { text: "Find Jobs", href: "/jobs" },
    { text: "For Employers", href: "/employers" },
    { text: "Career Advice", href: "/advice" },
    { text: "About Us", href: "/about" }
];

export const footerSections: FooterSection[] = [
    {
        title: "For Candidates",
        links: [
            { text: "Browse Jobs", href: "/jobs" },
            { text: "Career Advice", href: "/advice" },
            { text: "Resume Builder", href: "/resume" },
            { text: "Job Alerts", href: "/alerts" }
        ]
    },
    {
        title: "For Employers",
        links: [
            { text: "Post a Job", href: "/post-job" },
            { text: "Browse Candidates", href: "/candidates" },
            { text: "Recruiting Solutions", href: "/solutions" },
            { text: "Pricing", href: "/pricing" }
        ]
    },
    {
        title: "Support",
        links: [
            { text: "Help Center", href: "/help" },
            { text: "Terms of Service", href: "/terms" },
            { text: "Privacy Policy", href: "/privacy" },
            { text: "Contact Us", href: "/contact" }
        ]
    }
];
