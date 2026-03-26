import React, { useState } from 'react';
import { NavLink } from 'react-router';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Apps", path: "/apps" },
        { name: "Installation", path: "/installation" },
    ];

    const getActiveClass = ({ isActive }) => {
        return isActive
            ? "relative py-2 text-base font-medium transition-all duration-200 bg-linear-to-br from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent"
            : "relative py-2 text-base font-medium transition-all duration-200 text-gray-700 hover:text-[#632EE3]";
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center shrink-0 space-x-2">
                        <img 
                            src={logo}
                            alt="Hero.IO Logo"
                            className="h-8 w-auto"
                        />
                        <span className="text-xl font-bold bg-linear-to-br from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
                            HERO.IO
                        </span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={getActiveClass}
                                end={link.path === "/"}
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.name}
                                        {isActive && (
                                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-tr from-[#632EE3] to-[#9F62F2] rounded-full" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center">
                        <a
                            href="https://github.com/aam-bd"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-linear-to-br from-[#632EE3] to-[#9F62F2] hover:shadow-lg hover:scale-105 transition-all duration-200"
                        >
                            <i className="fa-brands fa-github"></i>
                            Contribute
                        </a>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#632EE3] hover:bg-gray-100 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100">
                        <div className="flex flex-col space-y-3">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `px-3 py-2 rounded-md text-base font-medium transition-colors ${
                                            isActive
                                                ? "bg-linear-to-br from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent"
                                                : "text-gray-700 hover:text-[#632EE3]"
                                        }`
                                    }
                                    end={link.path === "/"}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <a
                                href="https://github.com/aam-bd"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 mx-3 rounded-lg font-medium text-white bg-linear-to-br from-[#632EE3] to-[#9F62F2] hover:shadow-md transition-all duration-200"
                            >
                                <i className="fa-brands fa-github"></i>
                                Contribute
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;