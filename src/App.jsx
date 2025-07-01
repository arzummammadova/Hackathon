import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Layout from './components/layout/Layout';
import Detail from './pages/Detail';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';
import Otp from './pages/auth/Otp';
import AuthedLayout from './components/layout/AuthedLayout';  
import { OtelManage } from './pages/authenticated/OtelManage';
import RoomManager from './pages/authenticated/RoomManager';
import Cookies from 'js-cookie';
import axios from 'axios';
import useStore from './store';
import AssignCustomer from './pages/authenticated/AsignCustomer';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import AdminLayout  from  "./components/layout/AdminLayout";
import Admin from './pages/Admin';
import UserManager from './pages/Admin/UserManager';
import HotelManager from './pages/Admin/HotelManager';
import Customers from './pages/Admin/Customers';
import Services from './pages/Admin/Services';
import Profile from './pages/Admin/Profile';

const router = createBrowserRouter([
  // Routes with Layout
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'courses',
        element: <Courses />,
      },
      {
        path: 'rooms/:id',
        element: <Detail />,
      }
    ],
  },

  // Authentication routes without Layout
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Admin />,

      },
      {
        path: '/admin/user-manager',
        element: <UserManager />,
      },
      {
        path: '/admin/hotel-manager',
        element: <HotelManager />,
      },
      {
        path: '/admin/customers',
        element: <Customers />,
      },
      {
        path: '/admin/services',
        element: <Services />,
      },
      {
        path: '/admin/profile',
        element: <Profile />,
      },
    ]
  },
  {
    element: <AuthedLayout />,
    children: [
      {
        path: '/otel-manage',
        element: <OtelManage />,
      },
      // {
      //   path: '/profile',
      //   element: <Profile />,
      // },
      {
        path: '/room-manager',
        element: <RoomManager />,
      },
      {
        path: '/assign-customer',
        element: <AssignCustomer />,
      }
    ]
  }
  ,
  {
    path: '*',
    element: <NotFoundPage />,
  },

]);

const App = () => {
  const { setUser, logout } = useStore();

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      axios.get(`https://notfounders-001-site1.anytempurl.com/api/User/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        setUser(res.data?.data);
      }).catch(() => {
        logout();
      })
    }


  }, [setUser, logout])


  return <RouterProvider router={router} />;
}

export default App;