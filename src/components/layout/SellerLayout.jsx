import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarSeller from '../Seller/SellerSidebar';

const SellerLayout = () => {
    return (
        <div className="flex">
            <SidebarSeller />
            <main className="flex-1 bg-gray-100 p-6 min-h-screen">

                <Outlet />

            </main>
        </div>
    );
};

export default SellerLayout;
