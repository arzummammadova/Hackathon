import React from 'react';
import { Home, RefreshCcw, ArrowLeft } from 'lucide-react';
import imagee from '../../assets/notfound.png';
import bg from '../../assets/bg.png';

const NotFoundPage = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="rounded-2xl w-full max-w-md overflow-hidden bg-opacity-90 backdrop-blur-sm">
        <div className="p-6">
          <h1 className='font-bold text-center text-xl uppercase tracking-wider'>
            Oops Page Not Found
          </h1>
          <div className="flex justify-center my-4">
            <img src={imagee} alt="Page not found illustration" className="max-w-xs" />
          </div>
          <p className="text-gray-600 mb-8 text-center">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a 
            href="/"
            className="flex w-full flex-col items-center justify-center p-3 bg-black rounded-lg hover:bg-gray-100 transition-all text-white hover:text-black"
          >
            <span className="text-md mt-1 uppercase tracking-wider">Home</span>
          </a>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Need assistance? <a href="/contact" className="text-blue-600 hover:underline">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;