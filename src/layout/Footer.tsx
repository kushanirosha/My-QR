// Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section - Logo and Description */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-bold flex items-center">
            <span className="text-purple-400">ME</span>
            <span className="text-white">QR</span>
            <span className="text-purple-400 ml-1">®</span>
          </h3>
          <p className="text-sm mt-2 max-w-xs">
            Create codes with our free QR generator of codes. Comprehensible
            interface, variety in choosing the type of your QR-code, the ability
            to view statistics!
          </p>
        </div>

        {/* Right Section - Newsletter */}
        <div className="flex flex-col items-center md:items-end">
          <p className="text-sm mb-2">Our Newsletter</p>
          <p className="text-xs mb-2 max-w-xs text-center md:text-right">
            Subscribe our newsletter to receive our latest news and special
            offers.
          </p>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-lg border border-gray-600 bg-gray-700 text-white text-sm focus:outline-none focus:border-purple-400"
            />
            <button className="bg-white text-gray-800 p-2 rounded-r-lg hover:bg-gray-200 transition">
              Subscribe
            </button>
          </div>
          <div className="flex space-x-2 mt-2">
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="text-xl">📧</span> {/* Placeholder for email icon */}
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="text-xl">📘</span> {/* Placeholder for Facebook icon */}
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-xs">
        <p>Copyright © 2024-2025</p>
        <div className="flex justify-center space-x-8 mt-2">
          <span>Team - MY QR</span>
          <span>Sri Lanka</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;