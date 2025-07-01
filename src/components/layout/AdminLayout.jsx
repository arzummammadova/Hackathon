import React from 'react';
import AdminSidebar from '../Admin/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="flex">
            <AdminSidebar />
            <main className="flex-1 bg-gray-100 p-6 min-h-screen">

                <Outlet />

            </main>
        </div>
    );
};

export default AdminLayout;
