
export interface SuccessStory {
    quote: string;
    name: string;
    role: string;
    initials: string;
    color: string;
}

export interface Stat {
    value: string;
    label: string;
}

export interface TrustedCompany {
    name: string;
    color: string;
    shape: string;
}

export interface Step {
    title: string;
    description: string;
    icon: string;
}

export interface NavLink {
    text: string;
    href: string;
}

export interface FooterSection {
    title: string;
    links: NavLink[];
}

export interface SocialLink {
    platform: string;
    href: string;
    iconPath: string; // SVG path data
}
