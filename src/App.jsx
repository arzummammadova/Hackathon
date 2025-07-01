import React from 'react'
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
      }
    ]
  }

]);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;