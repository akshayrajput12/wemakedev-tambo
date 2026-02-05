import React, { useState } from 'react';
import type { Job } from '../../types/jobs';
import RichTextEditor from '../ui/RichTextEditor';

interface JobFormProps {
    initialData?: Job;
    onSubmit: (data: any) => void;
    onCancel: () => void;
    title: string;
}

export default function JobForm({ initialData, onSubmit, onCancel, title }: JobFormProps) {
    const [formData, setFormData] = useState<Partial<Job> & { status: string }>({
        title: '',
        company_name: '',
        location: '',
        type: 'Full-time',
        salary_range: '',
        description: '', // HTML content
        responsibilities: '', // HTML content
        requirements: '', // HTML content
        benefits: '', // HTML content,
        status: 'open',
        tags: [],
        ...initialData
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const [tagInput, setTagInput] = useState('');

    const handleAddTag = () => {
        if (!tagInput.trim()) return;
        const newTags = [...(formData.tags || [])];
        if (!newTags.includes(tagInput.trim())) {
            newTags.push(tagInput.trim());
            setFormData(prev => ({ ...prev, tags: newTags }));
        }
        setTagInput('');
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: (prev.tags || []).filter(tag => tag !== tagToRemove)
        }));
    };

    const handleTagKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="flex flex-col max-w-[1200px] w-full mx-auto">
            {/* Page Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-slate-900 dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">{title}</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Fill in the details below to post a new opening.</p>
                </div>
                <button
                    onClick={onCancel}
                    className="flex items-center justify-center rounded-xl h-10 px-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                    Cancel
                </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                {/* Left Column: Main Form */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Basic Info Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700/50">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">feed</span>
                            Basic Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <label className="flex flex-col gap-2">
                                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Job Title</span>
                                <input name="title" value={formData.title} onChange={handleChange} className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none" placeholder="e.g. Senior Product Designer" required />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Company Name</span>
                                <input name="company_name" value={formData.company_name} onChange={handleChange} className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none" placeholder="e.g. Acme Corp" required />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Location</span>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">location_on</span>
                                    <input name="location" value={formData.location} onChange={handleChange} className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 pl-11 pr-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none" placeholder="e.g. New York, NY (Remote)" required />
                                </div>
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Job Type</span>
                                <div className="relative">
                                    <select name="type" value={formData.type} onChange={handleChange} className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none appearance-none cursor-pointer">
                                        <option>Full-time</option>
                                        <option>Part-time</option>
                                        <option>Contract</option>
                                        <option>Internship</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                                </div>
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Salary Range</span>
                                <input name="salary_range" value={formData.salary_range} onChange={handleChange} className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none" placeholder="e.g. ₹12L - ₹18L" />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Status</span>
                                <div className="relative">
                                    <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none appearance-none cursor-pointer">
                                        <option value="open">Open</option>
                                        <option value="closed">Closed</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Rich Text Editors */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">description</span>
                            Job Description
                        </h3>
                        <div>
                            <RichTextEditor
                                value={formData.description || ''}
                                onChange={(val) => handleEditorChange('description', val)}
                                placeholder="Describe the role, responsibilities, and team culture..."
                            />
                        </div>
                        <div>
                            <label className="flex flex-col gap-2 mb-2">
                                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Responsibilities</span>
                                <RichTextEditor
                                    className="h-48"
                                    value={formData.responsibilities || ''}
                                    onChange={(val) => handleEditorChange('responsibilities', val)}
                                    placeholder="List key responsibilities..."
                                />
                            </label>
                        </div>
                        <div>
                            <label className="flex flex-col gap-2">
                                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Requirements</span>
                                <RichTextEditor
                                    className="h-48"
                                    value={formData.requirements || ''}
                                    onChange={(val) => handleEditorChange('requirements', val)}
                                    placeholder="List the key requirements..."
                                />
                            </label>
                        </div>
                        <div>
                            <label className="flex flex-col gap-2">
                                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Benefits</span>
                                <RichTextEditor
                                    className="h-48"
                                    value={formData.benefits || ''}
                                    onChange={(val) => handleEditorChange('benefits', val)}
                                    placeholder="List the perks and benefits..."
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right Column: Sidebar */}
                <div className="flex flex-col gap-6">
                    {/* Actions Card (Sticky on desktop) */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col gap-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Publishing</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Review your settings before publishing.</p>
                        <div className="flex flex-col gap-3 mt-2">
                            <button type="submit" className="w-full rounded-xl h-12 px-6 bg-[#0A66C2] hover:bg-[#004182] text-white text-base font-bold shadow-md shadow-[#0A66C2]/20 transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">send</span>
                                Publish Job
                            </button>
                            <button type="button" className="w-full rounded-xl h-12 px-6 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-base font-bold transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">save</span>
                                Save Draft
                            </button>
                        </div>
                    </div>

                    {/* Properties Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col gap-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">tune</span>
                            Properties
                        </h3>
                        <label className="flex flex-col gap-2">
                            <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Experience Level</span>
                            <div className="relative">
                                <select
                                    name="level"
                                    value={formData.level}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none appearance-none cursor-pointer"
                                >
                                    <option>Entry Level</option>
                                    <option>Mid Level</option>
                                    <option>Senior Level</option>
                                    <option>Executive</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">expand_more</span>
                            </div>
                        </label>
                        <div className="flex flex-col gap-2">
                            <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Skills (Tags)</span>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {formData.tags?.map((tag, index) => (
                                    <span key={index} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-100 dark:border-blue-800">
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTag(tag)}
                                            className="hover:text-blue-900 dark:hover:text-blue-100 focus:outline-none"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">close</span>
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="relative">
                                <input
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleTagKeyDown}
                                    className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 px-4 py-3 pr-10 text-slate-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none"
                                    placeholder="Add skill..."
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-primary transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tips Card */}
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/10">
                        <h4 className="text-primary font-bold text-sm mb-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                            Pro Tip
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                            Detailed job descriptions with salary ranges attract 30% more qualified candidates. Make sure to list specific requirements.
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}
