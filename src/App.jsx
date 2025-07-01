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
import ServiceManager from './pages/authenticated/ServiceManager';
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
    element: <AuthedLayout />,
    children: [
      {
        path: '/otel-manage',
        element: <OtelManage />,
      },
      {
        path: '/room-manager',
        element: <RoomManager />,
      },
      {
        path: '/assign-customer',
        element: <AssignCustomer />,
      },
      {
        path: '/service-manager',
        element: <ServiceManager />,
      }
    ]
  }

]);

const App = () => {
  const { setUser, logout } = useStore();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      axios.get(`https://notfounders-001-site1.anytempurl.com/api/User/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        setUser(res.data);
      }).catch(() => {
        logout();
      })
    }


  }, [setUser, logout])


  return <RouterProvider router={router} />;
}

export default App;