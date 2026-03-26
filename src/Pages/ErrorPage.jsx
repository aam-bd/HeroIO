import React from 'react';
import { useNavigate } from 'react-router';
import errorImg from '../assets/error-404.png'; // Adjust path as needed

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md text-center">
        <img 
          src={errorImg} 
          alt="404 Error" 
          className="w-full max-w-sm mx-auto mb-8"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;