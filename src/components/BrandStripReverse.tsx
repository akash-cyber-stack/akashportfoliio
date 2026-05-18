"use client";
import React, { useState } from "react";


const brands2 = [
  { name: "MOVATOBAGS" },
  { name: "INDE ARTISANS" },
  { name: "INDE ICONS" },
  { name: "OPEN LIMITS" },
  { name: "BMDU" },
];

export default function BrandStripReverse() {
  // Unique brand names
  const uniqueNames = React.useMemo(() => [...new Set(brands2.map(b => b.name))], []);
  return (
    <div className="relative w-full overflow-x-hidden py-8 animated-net-bg">
      <div className="absolute inset-0 bg-black opacity-60 pointer-events-none" />
      <div className="relative flex items-center justify-center">
        <div className="animate-marquee-reverse flex gap-24 w-full justify-center sm:min-w-full">
          {uniqueNames.map((name, i) => (
            <div key={"orig-" + i} className="flex-shrink-0 flex items-center justify-center h-16">
              <span className="text-2xl font-bold text-white/90 select-none">{name}</span>
            </div>
          ))}
          {uniqueNames.map((name, i) => (
            <div key={"dupe-" + i} className="flex-shrink-0 flex items-center justify-center h-16">
              <span className="text-2xl font-bold text-white/90 select-none">{name}</span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .animate-marquee-reverse {
          display: flex;
          animation: marquee-reverse 18s linear infinite;
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
