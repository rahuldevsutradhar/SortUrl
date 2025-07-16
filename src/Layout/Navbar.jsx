import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between relative">
      {/* Left - Logo */}
      <div className="flex-shrink-0">
        <h1 className="text-xl font-bold text-blue-600">SortURL</h1>
      </div>

      {/* Center - Menu */}
      <ul className="absolute left-1/2 transform -translate-x-1/2 flex gap-6 text-gray-700">
        <li className="hover:text-blue-600 cursor-pointer">Home</li>
        <li className="hover:text-blue-600 cursor-pointer">About</li>
        <li className="hover:text-blue-600 cursor-pointer">Services</li>
        <li className="hover:text-blue-600 cursor-pointer">Contact</li>
      </ul>

      {/* Right - Dashboard + User */}
      <div className="flex items-center gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Dashboard
        </button>

        <div className="relative">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaUser className="text-gray-700" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Account
              </a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Sign In
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
