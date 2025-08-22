import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Briefcase, Users, Home } from 'lucide-react';

const AdminPanelLayout = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-br from-[#0049BC] to-[#0270AD] text-white shadow-md p-5">
                <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
                <nav className="flex flex-col gap-4">
                    <Link to="/admin/dashboard" className="hover:text-yellow-300 flex items-center gap-2">
                        <Home size={18} /> Dashboard
                    </Link>
                    <Link to="/admin/jobs" className="hover:text-yellow-300 flex items-center gap-2">
                        <Briefcase size={18} /> Jobs
                    </Link>
                    <Link to="/admin/candidates" className="hover:text-yellow-300 flex items-center gap-2">
                        <Users size={18} /> Candidates
                    </Link>
                    <Link to="/admin/applications" className="hover:text-yellow-300 flex items-center gap-2">
                        📄 Applications
                    </Link>
                    <Link to="/" className="hover:text-red-400 flex items-center gap-2 mt-4">
                        <LogOut size={18} /> Logout
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
};

export default AdminPanelLayout;
