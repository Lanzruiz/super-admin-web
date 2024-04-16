import { Typography } from '@material-tailwind/react';
import React from 'react';

export default function NavHeader() {
  return (
    <div className="flex flex-col md:flex-row items-start gap-4 bg-primary rounded-lg px-6 py-2 shadow-lg">
      <div className="flex items-center">
        <img
          src="/img/smart_parking_logo.png"
          alt="logo"
          className="w-24 h-24 object-contain"
        />
      </div>

      <div className="flex items-center justify-center bg-primary h-full ps-4">
        <Typography
          variant="h6"
          className="font-bold flex-1 text-white text-base md:text-lg lg:text-xl xl:text-xl" // Responsive font sizes
        >
          SmartCity Reserved Parking System
        </Typography>
      </div>
      <div className="flex items-center">
        <img
          src="/img/whp_logo.png"
          alt="logo"
          className="w-24 h-24 object-contain"
        />
      </div>
    </div>
  );
}
