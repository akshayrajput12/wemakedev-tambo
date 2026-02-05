import NotificationCard from '../components/ui/NotificationCard';
import { supabase } from '../lib/supabaseClient';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchJobBySlug, uploadResume, submitApplication } from '../lib/api/index';

export default function JobApplyPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [job, setJob] = useState<any>(undefined);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Notification State
    const [notification, setNotification] = useState<{
        isVisible: boolean;
        title: string;
        message: string;
        type: 'success' | 'error' | 'info';
    }>({
        isVisible: false,
        title: '',
        message: '',
        type: 'success'
    });

    // Form State
    const [formData, setFormData] = useState<any>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        cvFile: null,
        currentJobTitle: '',
        yearsOfExperience: '',
        highestEducation: '',
        keySkills: '',
        linkedinProfile: '',
        githubProfile: '',
        portfolioUrl: '',
        whyGoodFit: '',
        noticePeriod: '',
        expectedSalary: ''
    });

    useEffect(() => {
        async function loadJob() {
            if (!slug) return;
            try {
                const data = await fetchJobBySlug(slug);
                setJob(data);
            } catch (err) {
                console.error("Failed to load job", err);
            } finally {
                setLoading(false);
            }
        }
        loadJob();
    }, [slug]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData((prev: any) => ({
                ...prev,
                cvFile: e.target.files![0]
            }));
        }
    };

    const showNotification = (title: string, message: string, type: 'success' | 'error' | 'info' = 'success') => {
        setNotification({
            isVisible: true,
            title,
            message,
            type
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!job) return;
        setSubmitting(true);

        try {
            // Get current user session
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                showNotification('Authentication Error', 'You must be logged in to apply.', 'error');
                setSubmitting(false);
                return;
            }

            let resumeUrl = '';
            if (formData.cvFile) {
                resumeUrl = await uploadResume(formData.cvFile);
            } else {
                showNotification('Resume Required', 'Please upload your customized resume.', 'error');
                setSubmitting(false);
                return;
            }

            const applicationPayload = {
                job_id: job.id,
                user_id: user.id, // CRITICAL FIX: Include user_id for RLS
                candidate_name: `${formData.firstName} ${formData.lastName}`,
                candidate_email: formData.email,
                candidate_phone: formData.phone,
                candidate_location: formData.location,
                experience_summary: `${formData.yearsOfExperience} years`,
                resume_url: resumeUrl,
                expected_salary: formData.expectedSalary,
                portfolio_url: formData.portfolioUrl,
                github_url: formData.githubProfile,
                linkedin_url: formData.linkedinProfile,
            };

            await submitApplication(applicationPayload);
            showNotification('Application Submitted!', 'Best of luck! You will be redirected shortly.', 'success');

            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

        } catch (error: any) {
            console.error("Submission failed", error);
            let msg = "Failed to submit application. Please try again.";
            if (error.code === '42501' || error.message?.includes('row-level security')) {
                msg = "Permission denied. Ensure you are logged in correctly.";
            }
            showNotification('Submission Failed', msg, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading Job Details...</div>;
    if (!job) {
        return <div className="p-10 text-center">Job Not Found</div>;
    }

    return (
        <div className="layout-container flex grow flex-col mt-24">
            <NotificationCard
                isVisible={notification.isVisible}
                title={notification.title}
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
            />
            <div className="flex flex-1 justify-center py-5 sm:px-6 lg:px-40">
                <div className="layout-content-container flex w-full max-w-[960px] flex-col flex-1">
                    {/* PageHeading */}
                    <div className="flex flex-wrap justify-between gap-6 p-4">
                        <div className="flex min-w-72 flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="material-symbols-outlined text-primary text-xl">work</span>
                                <span className="text-sm font-semibold text-primary uppercase tracking-wider">{job.type}</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] text-slate-900 dark:text-white">
                                {job.title}
                            </h1>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                <span className="material-symbols-outlined text-lg">apartment</span>
                                <span className="text-base font-medium">{job.company_name}</span>
                                <span className="mx-1">•</span>
                                <span className="material-symbols-outlined text-lg">public</span>
                                <span className="text-base font-medium">{job.location}</span>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex -space-x-2 overflow-hidden mr-4">
                                <img alt="Recruiter 1" className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-background-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAX22wipLYbbMxzAOHKjrMJpDPGe8CddgWIIllEQOgFvWezLrNKedVfx89U-Rj8l7pD9Am4guY-Iu8hWTDBmPxAKtPN10S6PreRSB2eKhRm-CaXMY25xYLWuZVdAgSFDSpy5MrOtdeDiWNe9z1btmC0YsmxF6x22XxCRrtBo0xd9X0WKLetTpyPWIRooWO7sJr5mvIS94osrK-I9BGPfRLXZwzYRGOMgQyYa_iMoUHX1Ao2v5s_smAndPocQiZiB34R8dVtctRD-8Q" />
                                <img alt="Recruiter 2" className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-background-dark object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKDYLnMdDnNDmJ2gKQVCVmJf2zdpScfkmptO84qF7RUIGduDx6DaHSp5hw6K4y_TCNiVx3o-xnv2QmFgKunV5sYvDoN8c5papyWssLKOadg89DpHYTnG5A96tI9fTzMMq_a1c8cLcgTw-Ye4fiEFkJu1jaW4VOavSEDT6tPRMTlcsfgvWiaXrV9iqzJUt4VvghBSyqGT4UsrQIgKrj02Gszg3JwVMxaPgXRRCm713-f17gB_SXBWoLtr3sj6fdgWW4DIvHOk15KjjK" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 dark:text-slate-400">Hiring Team</span>
                                <span className="text-sm font-semibold text-slate-900 dark:text-white">Active now</span>
                            </div>
                        </div>
                    </div>

                    {/* Tabs/Progress */}
                    <div className="sticky top-[73px] z-40 bg-background-light dark:bg-background-dark pb-6 pt-2">
                        <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800 px-4 gap-8 no-scrollbar">
                            <a className="flex shrink-0 flex-col items-center justify-center border-b-[3px] border-b-primary pb-[13px] pt-4" href="#personal-info">
                                <p className="text-slate-900 dark:text-white text-sm font-bold leading-normal tracking-[0.015em]">Personal Info</p>
                            </a>
                            <a className="flex shrink-0 flex-col items-center justify-center border-b-[3px] border-b-transparent hover:border-b-slate-300 pb-[13px] pt-4" href="#experience">
                                <p className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-bold leading-normal tracking-[0.015em]">Experience</p>
                            </a>
                            <a className="flex shrink-0 flex-col items-center justify-center border-b-[3px] border-b-transparent hover:border-b-slate-300 pb-[13px] pt-4" href="#social-links">
                                <p className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-bold leading-normal tracking-[0.015em]">Social Links</p>
                            </a>
                            <a className="flex shrink-0 flex-col items-center justify-center border-b-[3px] border-b-transparent hover:border-b-slate-300 pb-[13px] pt-4" href="#questions">
                                <p className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-bold leading-normal tracking-[0.015em]">Questions</p>
                            </a>
                        </div>
                    </div>

                    {/* Main Form Content */}
                    <form className="flex flex-col gap-8 px-4 pb-20" onSubmit={handleSubmit}>
                        {/* Personal Information */}
                        <div className="scroll-mt-32 rounded-2xl bg-white dark:bg-[#151f2b] p-6 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10" id="personal-info">
                            <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">person</span>
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">First Name</span>
                                    <input
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-[#1A2633] dark:text-white dark:placeholder-slate-500"
                                        placeholder="Jane"
                                        type="text"
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Last Name</span>
                                    <input
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-[#1A2633] dark:text-white dark:placeholder-slate-500"
                                        placeholder="Doe"
                                        type="text"
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Email Address</span>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">mail</span>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-base text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-[#1A2633] dark:text-white dark:placeholder-slate-500"
                                            placeholder="jane@example.com"
                                            type="email"
                                        />
                                    </div>
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Phone Number</span>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">call</span>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-base text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-[#1A2633] dark:text-white dark:placeholder-slate-500"
                                            placeholder="+1 (555) 000-0000"
                                            type="tel"
                                        />
                                    </div>
                                </label>
                                <label className="flex flex-col gap-2 md:col-span-2">
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Current Location</span>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">location_on</span>
                                        <input
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-base text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-[#1A2633] dark:text-white dark:placeholder-slate-500"
                                            placeholder="City, Country"
                                            type="text"
                                        />
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* CV Upload */}
                        <div className="rounded-2xl bg-white dark:bg-[#151f2b] p-6 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10">
                            <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">description</span>
                                Resume / CV
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Upload your CV in PDF format. Max file size 5MB.</p>
                            <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-[#1A2633] p-10 hover:bg-slate-100 dark:hover:bg-[#202e3d] transition-colors cursor-pointer group">
                                <input accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" />
                                {formData.cvFile ? (
                                    <>
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 mb-4">
                                            <span className="material-symbols-outlined text-3xl">check_circle</span>
                                        </div>
                                        <p className="text-base font-bold text-slate-900 dark:text-white">{formData.cvFile.name}</p>
                                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">Ready to submit</p>
                                        <p className="text-xs text-slate-400 mt-1">{(formData.cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary mb-4 group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                                        </div>
                                        <p className="text-base font-medium text-slate-900 dark:text-white">Click to upload or drag and drop</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">PDF (max. 5MB)</p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Professional Experience */}
                        <div className="scroll-mt-32 rounded-2xl bg-white dark:bg-[#151f2b] p-6 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10" id="experience">
                            <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">business_center</span>
                                Professional Experience
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label className="flex flex-col gap-2 md:col-span-2">
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Current Job Title</span>
                                    <input
                                        name="currentJobTitle"
                                        value={formData.currentJobTitle}
                                        onChange={handleInputChange}
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-[#1A2633] dark:text-white dark:placeholder-slate-500"
                                        placeholder="e.g. Senior Product Designer"
                                        type="text"
                                    />
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Years of Experience</span>
                                    <select
                                        name="yearsOfExperience"
                                        value={formData.yearsOfExperience}
                                        onChange={handleInputChange}
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-[#1A2633] dark:text-white"
                                    >
                                        <option disabled value="">Select option</option>
                                        <option value="0-1">0 - 1 years</option>
                                        <option value="1-3">1 - 3 years</option>
                                        <option value="3-5">3 - 5 years</option>
                                        <option value="5-8">5 - 8 years</option>
                                        <option value="8+">8+ years</option>
                                    </select>
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Highest Education</span>
                                    <select
                                        name="highestEducation"
                                        value={formData.highestEducation}
                                        onChange={handleInputChange}
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-[#1A2633] dark:text-white"
                                    >
                                        <option disabled value="">Select option</option>
                                        <option value="highschool">High School</option>
                                        <option value="bachelor">Bachelor's Degree</option>
                                        <option value="master">Master's Degree</option>
                                        <option value="phd">PhD</option>
                                        <option value="other">Other</option>
                                    </select>
                                </label>
                                <label className="flex flex-col gap-2 md:col-span-2">
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Key Skills</span>
                                    <textarea
                                        name="keySkills"
                                        value={formData.keySkills}
                                        onChange={handleInputChange}
                                        className="h-24 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-base text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-[#1A2633] dark:text-white dark:placeholder-slate-500"
                                        placeholder="e.g. React, TypeScript, Tailwind CSS, Figma (comma separated)"
                                    ></textarea>
                                </label>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="scroll-mt-32 rounded-2xl bg-white dark:bg-[#151f2b] p-6 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10" id="social-links">
                            <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">link</span>
                                Social Links
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">LinkedIn Profile</span>
                                    <div className="flex">
                                        <span className="inline-flex items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 px-4 text-slate-500 dark:border-slate-700 dark:bg-[#202e3d] dark:text-slate-400">linkedin.com/in/</span>
                                        <input
                                            name="linkedinProfile"
                                            value={formData.linkedinProfile}
                                            onChange={handleInputChange}
                                            className="h-12 w-full rounded-r-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-[#1A2633] dark:text-white"
                                            placeholder="username"
                                            type="text"
                                        />
                                    </div>
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">GitHub Profile</span>
                                    <div className="flex">
                                        <span className="inline-flex items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 px-4 text-slate-500 dark:border-slate-700 dark:bg-[#202e3d] dark:text-slate-400">github.com/</span>
                                        <input
                                            name="githubProfile"
                                            value={formData.githubProfile}
                                            onChange={handleInputChange}
                                            className="h-12 w-full rounded-r-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-[#1A2633] dark:text-white"
                                            placeholder="username"
                                            type="text"
                                        />
                                    </div>
                                </label>
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Portfolio URL</span>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[20px]">language</span>
                                        <input
                                            name="portfolioUrl"
                                            value={formData.portfolioUrl}
                                            onChange={handleInputChange}
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-base text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-[#1A2633] dark:text-white dark:placeholder-slate-500"
                                            placeholder="https://yourwebsite.com"
                                            type="url"
                                        />
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Major Questions */}
                        <div className="scroll-mt-32 rounded-2xl bg-white dark:bg-[#151f2b] p-6 shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10" id="questions">
                            <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">quiz</span>
                                Additional Questions
                            </h3>
                            <div className="flex flex-col gap-6">
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Why do you think you are a good fit for this role?</span>
                                    <textarea
                                        name="whyGoodFit"
                                        value={formData.whyGoodFit}
                                        onChange={handleInputChange}
                                        className="h-32 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-base text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-[#1A2633] dark:text-white dark:placeholder-slate-500"
                                        placeholder="Tell us about your relevant experience and why you are interested..."
                                    ></textarea>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <label className="flex flex-col gap-2">
                                        <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Notice Period</span>
                                        <select
                                            name="noticePeriod"
                                            value={formData.noticePeriod}
                                            onChange={handleInputChange}
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-[#1A2633] dark:text-white"
                                        >
                                            <option disabled value="">Select option</option>
                                            <option value="immediate">Immediate</option>
                                            <option value="2weeks">2 Weeks</option>
                                            <option value="1month">1 Month</option>
                                            <option value="2months">2 Months</option>
                                            <option value="3months+">3 Months+</option>
                                        </select>
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Expected Salary (Annual)</span>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₹</span>
                                            <input
                                                name="expectedSalary"
                                                value={formData.expectedSalary}
                                                onChange={handleInputChange}
                                                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-base text-slate-900 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-[#1A2633] dark:text-white dark:placeholder-slate-500"
                                                placeholder="e.g. 120,000"
                                                type="number"
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 pt-4 pb-12">
                            <button className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" type="button">
                                Save Draft
                            </button>
                            <button className="group relative w-full sm:w-auto overflow-hidden rounded-xl bg-green-600 px-8 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-background-dark" type="submit">
                                <span className="relative flex items-center justify-center gap-2">
                                    {submitting ? 'Submitting...' : 'Submit Application'}
                                    <span className="material-symbols-outlined text-[18px]">{submitting ? 'hourglass_empty' : 'send'}</span>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
