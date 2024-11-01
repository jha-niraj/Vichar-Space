import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const Layout: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1, padding: '2rem' }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;