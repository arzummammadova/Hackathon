import React from 'react';
import AdminSidebar from '../Admin/AdminSidebar';
import { Outlet } from 'react-router-dom';
import useStore from '../../store';

const AdminLayout = () => {
    const { user } = useStore();

    console.log(user);
    if (user.role !== 'admin') {
        return (
            <div className="flex items-center min-h-screen justify-center h-full">
                <p className="text-2xl font-bold text-gray-600">Admin Deyilsiniz</p>
            </div>
        );
    }

    else if (user.userName === 'NurlanAsadov') {
        return (
            <div className="flex items-center min-h-screen justify-center h-full">
                <p className="text-2xl font-bold text-gray-600">Admin Deyilsiniz</p>
            </div>
        );
    }
    else {



        return (

            <div className="flex">
                <AdminSidebar />
                <main className="flex-1 bg-gray-100 p-6 min-h-screen">
                    {user?.role === 'admin' ? (
                        <Outlet />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-2xl font-bold text-gray-600">Admin Deyilsiniz</p>
                        </div>
                    )}
                </main>
            </div>
        );
    }
};

export default AdminLayout;
