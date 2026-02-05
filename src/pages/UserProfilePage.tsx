import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import NotificationCard from '../components/ui/NotificationCard';

export default function UserProfilePage() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<any>({});
    const [isEditing, setIsEditing] = useState(false);

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

    // Form state
    const [fullName, setFullName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        async function loadProfile() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    setUser(user);
                    const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();

                    if (error && error.code !== 'PGRST116') {
                        console.error('Error fetching profile:', error);
                    }

                    if (data) {
                        setProfile(data);
                        setFullName(data.full_name || '');
                        setAvatarUrl(data.avatar_url || '');
                    }
                }
            } catch (err) {
                console.error("Error loading profile", err);
            } finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, []);

    const showNotification = (title: string, message: string, type: 'success' | 'error' | 'info' = 'success') => {
        setNotification({
            isVisible: true,
            title,
            message,
            type
        });
    };

    const handleSave = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const updates = {
                id: user.id,
                full_name: fullName,
                avatar_url: avatarUrl,
                updated_at: new Date().toISOString(),
            };

            const { error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.id);

            if (error) throw error;

            // Refresh local state
            const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            setProfile(data || {});
            setIsEditing(false);

            showNotification('Profile Updated', 'Your profile information has been saved successfully.', 'success');
        } catch (error: any) {
            console.error("Error saving profile", error);
            let errorMessage = "Failed to save profile. Please try again.";
            if (error.message && error.message.includes('Failed to fetch')) {
                errorMessage = "Network error. Please check your connection.";
            } else if (error.message) {
                errorMessage = error.message;
            }
            showNotification('Error', errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !profile.id) return <div className="p-10 text-center">Loading Profile...</div>;

    return (
        <div className="flex-1 flex justify-center py-6 sm:py-8 px-4 sm:px-6 lg:px-8 mt-20 relative">
            <NotificationCard
                isVisible={notification.isVisible}
                title={notification.title}
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
            />

            <div className="flex flex-col lg:flex-row max-w-[1000px] w-full gap-8">
                {/* Profile Sidebar/Card */}
                <div className="w-full lg:w-80 flex-shrink-0">
                    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-slate-200 dark:border-zinc-700 overflow-hidden">
                        <div className="h-24 bg-gradient-to-r from-primary/80 to-blue-400 relative"></div>
                        <div className="px-6 relative text-center -mt-12 pb-6">
                            <div className="size-24 rounded-full border-4 border-white dark:border-zinc-800 bg-slate-200 dark:bg-slate-700 mx-auto overflow-hidden">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-slate-400">
                                        {fullName ? fullName.charAt(0) : '?'}
                                    </div>
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-3">{fullName || 'Your Name'}</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>

                            <div className="mt-6 flex flex-col gap-3">
                                <button onClick={() => setIsEditing(!isEditing)} className="w-full py-2 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors">
                                    {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-slate-200 dark:border-zinc-700 p-6">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Profile Completion</h3>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-slate-500">85% Complete</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-zinc-700 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full w-[85%]"></div>
                        </div>
                        <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                Account Created
                            </li>
                            <li className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                                Email Verified
                            </li>
                            <li className="flex items-center gap-2 text-slate-400">
                                <span className="material-symbols-outlined text-[18px]">radio_button_unchecked</span>
                                Add Resume
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Profile Details / Edit Form */}
                <div className="flex-1 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-slate-200 dark:border-zinc-700 p-6 sm:p-10">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Personal Information</h2>

                    {isEditing ? (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Avatar URL</label>
                                <input
                                    type="text"
                                    value={avatarUrl}
                                    onChange={(e) => setAvatarUrl(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="https://"
                                />
                                <p className="text-xs text-slate-500 mt-1">Direct link to an image (optional)</p>
                            </div>
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center gap-2"
                                >
                                    {loading && <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</p>
                                    <p className="text-base font-medium text-slate-900 dark:text-white">{fullName || 'Not set'}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</p>
                                    <p className="text-base font-medium text-slate-900 dark:text-white">{user?.email}</p>
                                </div>
                                <div className="col-span-full">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Account ID</p>
                                    <p className="text-sm font-mono text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-700">{user?.id}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
