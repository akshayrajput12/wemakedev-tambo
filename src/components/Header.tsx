import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { headerLinks } from '../data/navigation';
import { supabase } from '../lib/supabaseClient';

export default function Header() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Get initial session
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
            if (user) fetchProfile(user.id);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) fetchProfile(session.user.id);
            else {
                setAvatarUrl(null);
                setIsAdmin(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    async function fetchProfile(userId: string) {
        const { data } = await supabase.from('profiles').select('avatar_url, is_admin').eq('id', userId).single();
        if (data) {
            setAvatarUrl(data.avatar_url);
            setIsAdmin(data.is_admin || false);
        }
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/');
        setOpen(false);
    };

    // Default avatar if none
    const displayAvatar = avatarUrl || user?.user_metadata?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuAcEzavaaHshIObHgA1KqkcwngckSwv5gXXAUaJEIbCZ4vrr_AKgZMn1AXV0j9GHRmrh6-a-bCBZwsp44meQ020dKPqsctCDm_9_Mt-QzS08lBa4o9pDwMh8c_N40rXETD_jw63PBctPaQBHq97fVcemS6liwg7aQe0OS2oINmJuqhoNG7ToFG8beJSBydYI2aQBrZDjE1pc9Su9wD0zEJkt6Q2ud6NSwVvy03KSCEzUqe9i46IC418AAC4nZiO4zMTWSu_VdpGxqIl";

    return (
        <header
            className={cn(
                'fixed top-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-7xl rounded-full border border-white/20 bg-white/70 dark:bg-[#101922]/70 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 ease-out animate-in slide-in-from-top-4 fade-in zoom-in-95',
                {
                    'bg-white/95 dark:bg-[#101922]/95 shadow-xl': open,
                }
            )}
        >
            <nav
                className={cn(
                    'flex h-20 w-full items-center justify-between px-6 transition-all ease-out',
                )}
            >
                <Link
                    to="/"
                    className="flex items-center gap-4 group cursor-pointer"
                    onClick={() => setOpen(false)}
                >
                    <div className="w-12 h-12 flex items-center bg-primary rounded-full justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-white text-2xl">work</span>
                    </div>
                    <span className="text-sm font-black tracking-widest uppercase text-slate-dark dark:text-white hidden sm:block">
                        TCD MultiRecruit
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-1 lg:flex">
                    {headerLinks.map((link, i) => (
                        <Link
                            key={i}
                            className={cn(
                                "flex items-center justify-center h-10 px-4 rounded-full text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all duration-300"
                            )}
                            to={link.href}
                        >
                            {link.text}
                        </Link>
                    ))}

                    {user ? (
                        <div className="flex items-center gap-2 ml-2">
                            {isAdmin && (
                                <Link to="/admin">
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-md mr-2">
                                        <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                                        <span className="text-xs font-bold uppercase tracking-wide">Admin</span>
                                    </button>
                                </Link>
                            )}
                            <Link to="/dashboard">
                                <button className="flex items-center gap-2 px-1 py-1 pr-4 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-300 dark:border-slate-600">
                                        <img src={displayAvatar} alt="Profile" className="h-full w-full object-cover" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                                        Dashboard
                                    </span>
                                </button>
                            </Link>
                            <button onClick={handleSignOut} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-colors" title="Sign Out">
                                <span className="material-symbols-outlined text-[20px]">logout</span>
                            </button>
                        </div>
                    ) : (
                        <Link to="/auth">
                            <button className="ml-2 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-6 h-9 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center">
                                Get Started
                            </button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="lg:hidden size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <span className="material-symbols-outlined text-slate-dark dark:text-white">
                        {open ? 'close' : 'menu'}
                    </span>
                </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            <div
                className={cn(
                    'absolute top-[calc(100%+1rem)] left-0 right-0 z-40 flex flex-col overflow-hidden bg-white/90 dark:bg-[#101922]/95 backdrop-blur-xl rounded-[2rem] border border-white/20 shadow-2xl lg:hidden transition-all duration-500 origin-top',
                    open ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-4 pointer-events-none',
                )}
            >
                <div
                    className={cn(
                        'flex flex-col justify-between gap-y-2 p-6',
                    )}
                >
                    <div className="flex flex-col gap-2">
                        {headerLinks.map((link) => (
                            <Link
                                key={link.text}
                                className={cn(
                                    'flex items-center w-full h-14 px-6 rounded-xl text-lg font-medium uppercase tracking-widest text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                                )}
                                to={link.href}
                                onClick={() => setOpen(false)}
                            >
                                {link.text}
                            </Link>
                        ))}
                        {user && (
                            <Link
                                className={cn(
                                    'flex items-center w-full h-14 px-6 rounded-xl text-lg font-medium uppercase tracking-widest text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                                )}
                                to="/dashboard"
                                onClick={() => setOpen(false)}
                            >
                                Dashboard
                            </Link>
                        )}
                        {isAdmin && (
                            <Link
                                className={cn(
                                    'flex items-center w-full h-14 px-6 rounded-xl text-lg font-medium uppercase tracking-widest text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                                )}
                                to="/admin"
                                onClick={() => setOpen(false)}
                            >
                                Admin Panel
                            </Link>
                        )}
                    </div>
                    <div className="flex flex-col gap-4 mt-6">
                        {user ? (
                            <button
                                onClick={handleSignOut}
                                className="w-full h-14 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest rounded-xl shadow-md hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">logout</span>
                                Sign Out
                            </button>
                        ) : (
                            <Link to="/auth" onClick={() => setOpen(false)}>
                                <button className="w-full h-14 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-md hover:bg-primary/90 transition-all">
                                    Get Started
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
