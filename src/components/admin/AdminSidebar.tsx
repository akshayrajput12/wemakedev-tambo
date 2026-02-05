import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar() {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <aside className="flex w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#16202a] h-full transition-colors hidden lg:flex sticky top-0 h-screen">
            <div className="p-6">
                <Link to="/admin" className="flex items-center gap-3">
                    <div className="bg-center bg-no-repeat bg-cover rounded-full h-10 w-10 shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAFrvRwCJ6__4OLuPtrsLLNPZB6Rm3WigY5spcYH5oLbe-pLQP8jk9CIS2A6kg3g6ZEms2xTE3C76j6MIDtLC6C9RxVsrLJ9aNEmyR_OtKtz_aSS10DrBTtenhKESVv_WNu_QWNuxekVWxclZ3ER4P3zHevKNycxLqz40yXvhqjHeR44AHYhQH0KhefJRD9V9wGl6nTGqbW9LK_kcb-w6vaTuCQRv-LpIV9zLNRO-H1TCHP_8u_XiyUynr0vSlnjY1X2FDIOkrtgrSJ")' }}></div>
                    <div className="flex flex-col">
                        <h1 className="text-slate-900 dark:text-white text-base font-bold leading-normal">TCD MultiRecruit</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Admin Portal</p>
                    </div>
                </Link>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-2">
                <Link
                    to="/admin"
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors group ${isActive('/admin') && location.pathname === '/admin' ? 'bg-primary/10 dark:bg-primary/20' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                    <span className={`material-symbols-outlined ${isActive('/admin') && location.pathname === '/admin' ? 'text-primary' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`} style={{ fontSize: '24px' }}>dashboard</span>
                    <p className={`${isActive('/admin') && location.pathname === '/admin' ? 'text-primary' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'} font-medium text-sm leading-normal`}>Dashboard</p>
                </Link>
                <Link
                    to="/admin/jobs"
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors group ${isActive('/admin/jobs') ? 'bg-primary/10 dark:bg-primary/20' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                    <span className={`material-symbols-outlined ${isActive('/admin/jobs') ? 'text-primary' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`} style={{ fontSize: '24px' }}>work</span>
                    <p className={`${isActive('/admin/jobs') ? 'text-primary' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'} font-medium text-sm leading-normal`}>Jobs</p>
                </Link>
                <Link
                    to="/admin/applications"
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors group ${isActive('/admin/applications') ? 'bg-primary/10 dark:bg-primary/20' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                    <span className={`material-symbols-outlined ${isActive('/admin/applications') ? 'text-primary' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`} style={{ fontSize: '24px' }}>group</span>
                    <p className={`${isActive('/admin/applications') ? 'text-primary' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'} font-medium text-sm leading-normal`}>Applications</p>
                </Link>
                <div className="my-2 border-t border-slate-200 dark:border-slate-800"></div>
                <Link
                    to="/admin/settings"
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors group ${isActive('/admin/settings') ? 'bg-primary/10 dark:bg-primary/20' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                    <span className={`material-symbols-outlined ${isActive('/admin/settings') ? 'text-primary' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`} style={{ fontSize: '24px' }}>settings</span>
                    <p className={`${isActive('/admin/settings') ? 'text-primary' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'} font-medium text-sm leading-normal`}>Settings</p>
                </Link>
            </nav>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">A</div>
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">Admin User</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">admin@tcd.com</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
