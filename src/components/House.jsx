import React from 'react';

// import icons
import { BiBed, BiBath, BiArea } from 'react-icons/bi';

const House = ({ house }) => {
  return (
    <div className="group bg-slate-900/70 border border-cyan-300/25 shadow-1 hover:shadow-neon hover:border-cyan-300/60 transition-all duration-300 p-5 rounded-3xl w-full max-w-[352px] mx-auto cursor-pointer backdrop-blur-xl transform hover:-translate-y-2">
      <div className="relative mb-6 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-900/40 opacity-80" />
        <img className="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-500" src={house.image} alt="" />
        <div className="absolute top-3 left-3 rounded-full bg-slate-900/70 backdrop-blur-md border border-cyan-300/60 px-3 py-1 text-xs text-cyan-100 font-medium">
          Featured
        </div>
      </div>
      <div className="mb-4 flex gap-x-2 text-xs">
        <div className="bg-emerald-500/90 rounded-full text-slate-50 px-3 py-1 inline-block">
          {house.type}
        </div>
        <div className="bg-sky-500/90 rounded-full text-slate-50 px-3 py-1 inline-block">
          {house.country}
        </div>
      </div>
      <div className="text-base font-semibold max-w-[260px] text-slate-50 mb-1">
        {house.address}
      </div>
      <div className="flex gap-x-4 my-4">
        <div className="flex items-center text-cyan-100/80 gap-1">
          <div className="text-[20px] rounded-full">
            <BiBed />
          </div>
          <div className="text-base">{house.bedrooms}</div>
        </div>
        <div className="flex items-center text-cyan-100/80 gap-1">
          <div className="text-[20px] rounded-full">
            <BiBath />
          </div>
          <div className="text-base">{house.bathrooms}</div>
        </div>
        <div className="flex items-center text-cyan-100/80 gap-1">
          <div className="text-[20px] rounded-full">
            <BiArea />
          </div>
          <div className="text-base">{house.surface}</div>
        </div>
      </div>
      <div className="text-lg font-semibold text-cyan-300 mb-2">
        $ {house.price}
      </div>
      <p className="text-xs text-slate-300/80">
        Tap to view full details, contact the owner, and save your dream house.
      </p>
    </div>
  );
};

export default House;
