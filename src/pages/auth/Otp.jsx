import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    
    // Focus next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    console.log('Entered OTP:', enteredOtp);
    // Verify OTP logic here
    // On successful verification, you might navigate to a new password page or login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify your identity
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We've sent a 6-digit code to your email
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-between space-x-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              ))}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify Code
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive a code?{' '}
              <button className="font-medium text-indigo-600 hover:text-indigo-500">
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;