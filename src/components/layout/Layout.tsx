import React, { type ReactNode } from 'react';
import Header from '../Header';
import Footer from '../Footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-dark dark:text-white antialiased min-h-screen flex flex-col">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
