import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between relative">
      <div className="flex-shrink-0">
        <Link to="/">
         <h1 className="text-xl font-bold text-blue-600">SortURL</h1>
         </Link>
       
      </div>

      <ul className="absolute left-1/2 transform -translate-x-1/2 flex gap-6 text-gray-700">
        <li>
          <Link to="/login" className="hover:text-blue-600 cursor-pointer">Login</Link>
        </li>
        <li>
          <Link to="/registration" className="hover:text-blue-600 cursor-pointer">Registration</Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Dashboard
        </Link>

        <div className="relative">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
          <FaUser className="text-gray-700" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
              <Link to="/account" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Account
              </Link>
              <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
