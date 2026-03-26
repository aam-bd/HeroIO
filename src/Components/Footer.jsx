import React from 'react';
import logo from '../assets/logo.png'; 

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Hero.IO Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold bg-linear-to-br from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
                HERO.IO
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting innovative apps to make everyday life simpler, smarter, and more exciting.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-[#9F62F2] transition-colors">About Us</a></li>
              <li><a href="/careers" className="text-gray-400 hover:text-[#9F62F2] transition-colors">Careers</a></li>
              <li><a href="/blog" className="text-gray-400 hover:text-[#9F62F2] transition-colors">Blog</a></li>
              <li><a href="/press" className="text-gray-400 hover:text-[#9F62F2] transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/apps" className="text-gray-400 hover:text-[#9F62F2] transition-colors">Our Apps</a></li>
              <li><a href="/installation" className="text-gray-400 hover:text-[#9F62F2] transition-colors">Installation</a></li>
              <li><a href="/docs" className="text-gray-400 hover:text-[#9F62F2] transition-colors">Documentation</a></li>
              <li><a href="/support" className="text-gray-400 hover:text-[#9F62F2] transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              <li><a href="/privacy" className="text-gray-400 hover:text-[#9F62F2] transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-[#9F62F2] transition-colors">Terms of Service</a></li>
              <li><a href="/cookies" className="text-gray-400 hover:text-[#9F62F2] transition-colors">Cookie Policy</a></li>
            </ul>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="https://github.com/aam-bd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#9F62F2] transition-colors"
                aria-label="GitHub"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href="https://x.com/aalmamun78"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#9F62F2] transition-colors"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/aalmamunbd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#9F62F2] transition-colors"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a
                href="mailto:aalmamun871@gmail.com"
                className="text-gray-400 hover:text-[#9F62F2] transition-colors"
                aria-label="Email"
              >
                <i className="fas fa-envelope text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} HERO.IO. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;