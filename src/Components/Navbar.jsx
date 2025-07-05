import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-white font-bold text-xl">
            VistaraStays
          </Link>

          {/* Toggle button for mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
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

          {/* Navigation links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/blog"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              Blog
            </Link>
            <Link
              to="/hotels"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              Hotels
            </Link>
            <Link
              to="/favourite"
              className="text-gray-300 hover:text-white transition duration-300"
            >
              Favourite
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-4 space-y-1 bg-gray-800" id="mobile-menu">
          <Link
            to="/blog"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/hotels"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Hotels
          </Link>
          <Link
            to="/favourite"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Favourite
          </Link>
        </div>
      )}
    </nav>
  );
}
