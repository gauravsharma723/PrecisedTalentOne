import React from 'react';

const AdminDashboardOne = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-precisedDarkGray">Welcome Admin</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold">Total Jobs</h2>
                    <p className="text-2xl font-bold text-precisedBlue">32</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold">Registered Candidates</h2>
                    <p className="text-2xl font-bold text-precisedBlue">84</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold">Applications</h2>
                    <p className="text-2xl font-bold text-precisedBlue">147</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardOne;
