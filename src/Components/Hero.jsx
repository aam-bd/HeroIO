import React from "react";
import hero from '../assets/hero.png';

const Hero = () => {
  return (
    <div className="pt-10 md:pt-20 bg-[#f5f5f5]">
      {/* Heading Section */}
      <div className="text-center font-bold inter">
        <h1 className="text-4xl md:text-6xl text-[#001931]">
          We Build
        </h1>
        <h1 className="text-4xl md:text-6xl text-[#001931] mt-3 md:mt-5">
          <span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
            Productive
          </span> Apps
        </h1>
      </div>

      {/* Description */}
      <p className="text-sm md:text-base text-[#627382] text-center inter mx-4 md:mx-auto mt-4 md:mt-7">
        At HERO.IO, we craft innovative apps designed to make everyday life simpler, smarter, and more exciting. <br />
        Our goal is to turn your ideas into digital experiences that truly make an impact.
      </p>

      {/* Buttons Container */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-6 md:mt-10 mx-4">
        <button className="group flex items-center justify-center gap-2 w-48 sm:w-40 py-2 px-4 rounded border border-[#627382] bg-transparent text-[#001931] font-medium transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md hover:border-[#632EE3] hover:bg-purple-50 cursor-pointer">
          <i className="fa-brands fa-google-play"></i>
          <span>Google Play</span>
        </button>
        <button className="group flex items-center justify-center gap-2 w-48 sm:w-40 py-2 px-4 rounded border border-[#627382] bg-transparent text-[#001931] font-medium transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md hover:border-[#632EE3] hover:bg-purple-50 cursor-pointer">
          <i className="fa-brands fa-app-store-ios" style={{ color: "#00bffc" }}></i>
          <span>App Store</span>
        </button>
      </div>

      {/* Hero Image */}
      <div className="mx-auto mt-8 md:mt-10 px-4">
        <img
          src={hero}
          alt="Hero Image"
          className="mx-auto w-full max-w-4xl h-auto"
        />
      </div>
    </div>
  );
};

export default Hero;