import { Typography } from '@material-tailwind/react';
import React from 'react';

export default function NavHeader() {
  return (
    <header className="flex w-full flex-row items-center gap-3 rounded-md bg-primary px-3 py-4">
      <figure className="flex h-12 w-12 items-center">
        <img
          className=""
          src="/assets/image/smart_parking_logo.png"
          alt="Smart Parking Logo"
        />
      </figure>
      <section className="flex flex-1 flex-col gap-1">
        <p className="text-[10px] text-white">
          Smart City Reserved <br /> Parking System
        </p>
        <h4 className="text-[14.5px] font-semibold leading-5 text-white">
          Main Administrator Panel
        </h4>
      </section>
      <figure className="flex h-12 w-12 items-center">
        <img
          className=""
          src="/assets/image/whp_logo.png"
          alt="Smart Parking Logo"
        />
      </figure>
    </header>
  );
}
