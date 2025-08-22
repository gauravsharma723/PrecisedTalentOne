import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, UserCircle } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const SimpleUserDropdown = ({ user }) => {
    const [open, setOpen] = useState(false);

    const { logout } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogout = () => {
        logout();
        toast({
            title: 'Logged Out',
            description: 'You have been successfully logged out.',
        });
        navigate('/login');
    };

    return (
        <div className="relative inline-block text-left self-center">
            <NavLink
                onClick={() => setOpen(!open)}
                className="flex items-center px-3 rounded-full text-sm font-medium self-center"
            >
                <UserCircle className="w-8 h-8 text-precisedBlue me-2" />
                {user.name}
            </NavLink>

            {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow p-4 z-10">
                    <button
                        onClick={() => {
                            handleLogout();
                            setOpen(false);
                        }}
                        className="flex items-center text-red-600 hover:text-red-800"
                    >
                        <LogOut className="w-5 h-5 mr-2" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default SimpleUserDropdown;
