import React from 'react';

const ScrollingRibbon = () => {
  return (
    <div className="bg-black max-w-[1540px] mx-auto">
      <div className="max-w-[1300px] mx-auto overflow-hidden whitespace-nowrap py-6 sm:py-8 border-y border-white/10">
        <div className="inline-block animate-scroll-x">
          <span className="text-white text-base sm:text-lg md:text-xl font-monument uppercase tracking-[0.15em]">
            Des trajets confortables et abordables
          </span>
          <span className="mx-8 text-primary-light">★</span>
          <span className="text-white text-base sm:text-lg md:text-xl font-monument uppercase tracking-[0.15em]">
            Des trajets confortables et abordables
          </span>
          <span className="mx-8 text-primary-light">★</span>
        </div>
        <div className="inline-block animate-scroll-x">
          <span className="text-white text-base sm:text-lg md:text-xl font-monument uppercase tracking-[0.15em]">
            Des trajets confortables et abordables
          </span>
          <span className="mx-8 text-primary-light">★</span>
          <span className="text-white text-base sm:text-lg md:text-xl font-monument uppercase tracking-[0.15em]">
            Des trajets confortables et abordables
          </span>
          <span className="mx-8 text-primary-light">★</span>
        </div>
      </div>
    </div>
  );
};

export default ScrollingRibbon; 