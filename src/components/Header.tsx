import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { headerLinks } from '../data/navigation';

export default function Header() {
    const [open, setOpen] = useState(false);

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
                    <Link to="/auth">
                        <button className="ml-2 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-6 h-9 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center">
                            Get Started
                        </button>
                    </Link>
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
                    </div>
                    <div className="flex flex-col gap-4 mt-6">
                        <Link to="/auth" onClick={() => setOpen(false)}>
                            <button className="w-full h-14 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-md hover:bg-primary/90 transition-all">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
