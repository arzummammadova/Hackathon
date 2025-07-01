import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSWRMutation from 'swr/mutation';

const API_BASE = 'https://notfounders-001-site1.anytempurl.com';

// --- helper that SWR will call ---
const forgotPassword = async (url, { arg }) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),        // { email }
  });

  if (!res.ok) {
    // Let the component decide what to show
    const { message } = await res.json();
    throw new Error(message ?? 'Failed to send verification code');
  }
  return res.json();                  // e.g. { token: '...' } or { success: true }
};

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // SWR mutation hook
  const {
    trigger,          // function to fire the request
    isMutating,       // boolean while request is in flight
    data,             // response on success
    error,            // Error instance on failure
  } = useSWRMutation(
    `${API_BASE}/api/User/forgot-password`,
    forgotPassword
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await trigger({ email });       // POST { email }
      // Optional: show a toast/snackbar here
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      // nothing to do – `error` already set for UI
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email and we&apos;ll send you a verification code
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md
                             shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500
                             focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {error && (
                <p className="mt-1 text-sm text-red-500">{error.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isMutating}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md
                            shadow-sm text-sm font-medium text-white bg-indigo-600
                            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                            focus:ring-indigo-500 ${isMutating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isMutating ? 'Sending…' : 'Send Verification Code'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Back to login
            </Link>
          </div>
          {data && (
            <p className="mt-4 text-center text-green-600">
              Verification code sent! Check your inbox.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
