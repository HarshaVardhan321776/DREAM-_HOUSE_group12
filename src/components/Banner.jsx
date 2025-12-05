import React from 'react';

import Image from '../assets/img/hom.jpg';
import Search from './Search';

const Banner = () => {
  return (
    <section className="h-full max-h-[640px] mb-10 xl:mb-20 relative">
      <div className="absolute inset-0 -z-10 bg-hero-neon opacity-80" />
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-0">
        <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0">
          <div className="inline-flex items-center gap-2 px-4 py-1 mb-4 rounded-full border border-cyan-400/40 bg-slate-900/60 backdrop-blur-md text-xs uppercase tracking-[0.2em] text-cyan-200 animate-glow">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-neon" />
            Smart way to your next house
          </div>
          <h1 className="text-4xl lg:text-[56px] font-semibold leading-tight mb-6 text-slate-50 drop-shadow-[0_0_25px_rgba(15,23,42,0.9)]">
            Find Your{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              Dream House
            </span>{' '}
            From Trusted Sellers
          </h1>
          <p className="max-w-[520px] mb-8 text-slate-200/80">
            Explore Beautiful Houses. Choose the One That Feels Like Yours.
          </p>
        </div>
        <div className="hidden flex-1 lg:flex justify-end items-end pr-6">
          <div className="relative w-full max-w-[460px]">
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-cyan-400/40 via-sky-500/30 to-indigo-500/40 blur-2xl opacity-80 animate-pulse" />
            <div className="relative rounded-[32px] overflow-hidden border border-cyan-300/40 bg-slate-900/70 backdrop-blur-xl shadow-neon animate-float">
              <img src={Image} alt="" className="w-full h-full object-cover scale-110" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 mt-8">
        <Search />
      </div>
    </section>
  );
};

export default Banner;
