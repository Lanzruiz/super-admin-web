import React from 'react';

const LoadingScreen = ({ size = 24, color = 'blue', className = '' }) => {
  return (
    <svg
      className={`animate-spin h-${size} w-${size} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className={`opacity-25 ${color === 'white' ? 'text-white' : 'text-blue-600'}`}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className={`opacity-75 ${color === 'white' ? 'text-white' : 'text-blue-600'}`}
        fill="currentColor"
        d="M12 2a10 10 0 00-2.47 19.74L12 14V2z"
      ></path>
    </svg>
  );
};

export default LoadingScreen;
