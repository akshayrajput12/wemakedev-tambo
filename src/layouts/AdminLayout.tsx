import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import { supabase } from '../lib/supabaseClient';

export default function AdminLayout() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/auth');
                return;
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('is_admin')
                .eq('id', session.user.id)
                .single();

            if (!profile?.is_admin) {
                navigate('/'); // Not authorized
            }
            setLoading(false);
        };
        checkAdmin();
    }, [navigate]);

    if (loading) return <div className="p-10 text-center">Checking authorization...</div>;

    return (
        <div className="flex min-h-screen w-full bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white">
            <AdminSidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background-light dark:bg-background-dark">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
