import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";
import { toastdev } from "@azadev/react-toastdev";
import { BASE_URL } from '../../constants/api';
import { FaUser, FaKey, FaCheckCircle } from 'react-icons/fa';
import useStore from '../../store';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const { setUser } = useStore();


  useEffect(() => {
    if (Cookies.get("accessToken")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + 'User/login-with-username-password', {
        userName,
        password,
      });
      if (res.data?.isSuccess && res.data?.token?.accessToken) {
        setUser(res.data?.user)
        Cookies.set("accessToken", res.data.token.accessToken, { expires: 7, path: "/" });
        toastdev.success(res.data.message || "Giriş uğurlu oldu.", { sound: true, duration: 2000, position: 't-center' });
        setSuccess(true);
        setTimeout(() => navigate("/"), 1200);
        return;
      } else {
        console.log(res.data);

        toastdev.error(res.data?.message || "Giriş uğursuz oldu!", { sound: true, duration: 2000, position: 't-center' });
      }
    } catch (err) {
      console.log(err);
      toastdev.error(err.response?.data?.message || "Xəta baş verdi!", { sound: true, duration: 2000, position: 't-center' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-900 tracking-wide">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-2xl rounded-2xl border border-blue-100">
          {success ? (
            <div className="flex flex-col items-center justify-center py-10">
              <FaCheckCircle className="text-green-500 text-5xl mb-4 animate-bounce" />
              <div className="text-lg font-semibold text-green-700 mb-2">Giriş uğurlu oldu!</div>
              <div className="text-gray-500">Ana səhifəyə yönləndirilirsiniz...</div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-blue-400 text-lg" />
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  autoComplete="username"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Username"
                  className="appearance-none block w-full px-10 py-3 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:text-base bg-blue-50"
                />
              </div>
              <div className="relative">
                <FaKey className="absolute left-3 top-3 text-blue-400 text-lg" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="appearance-none block w-full px-10 py-3 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:text-base bg-blue-50"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link to="/reset-password" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200"
              >
                Sign in
              </button>
            </form>
          )}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-400">
                  Or
                </span>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-center text-base text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;