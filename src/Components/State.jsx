import React from 'react';
import CountUpPkg from 'react-countup';

const CountUp = CountUpPkg.default || CountUpPkg;

const State = () => {
  return (
    <div className="bg-linear-to-br from-[#632EE3] to-[#9F62F2] py-10 md:py-16 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16">
          Trusted by Millions, Built for You
        </h2>

        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 text-center inter">
          {/* Total Downloads */}
          <div className="flex-1">
            <p className="text-xs md:text-base tracking-wide mb-2">
              Total Downloads
            </p>
            <div className="text-4xl md:text-6xl font-bold mb-2">
              <CountUp 
                start={0} 
                end={29.6} 
                duration={2.5} 
                separator="," 
                decimals={1}
                enableScrollSpy={true}
                scrollSpyOnce={true}
              />
              <span>M</span>
            </div>
            <p className="text-xs md:text-sm opacity-90">21% More Than Last Month</p>
          </div>

          {/* Total Reviews */}
          <div className="flex-1">
            <p className="text-xs md:text-base tracking-wide mb-2">
              Total Reviews
            </p>
            <div className="text-4xl md:text-6xl font-bold mb-2">
              <CountUp 
                start={0} 
                end={906} 
                duration={2.5} 
                separator="," 
                decimals={0}
                enableScrollSpy={true}
                scrollSpyOnce={true} 
              />
              K
            </div>
            <p className="text-xs md:text-sm opacity-90">46% More Than Last Month</p>
          </div>

          {/* Active Apps */}
          <div className="flex-1">
            <p className="text-xs md:text-base tracking-wide mb-2">
              Active Apps
            </p>
            <div className="text-4xl md:text-6xl font-bold mb-2">
              <CountUp 
                start={0} 
                end={132} 
                duration={2.5} 
                separator="," 
                decimals={0} 
                enableScrollSpy={true}
                scrollSpyOnce={true}
              />
              +
            </div>
            <p className="text-xs md:text-sm opacity-90">31 More Will Launch</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default State;