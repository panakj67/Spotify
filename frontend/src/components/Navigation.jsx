import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navigation = () => {
  const location = useLocation();
  const path = location.pathname;
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={`fixed bottom-0 left-0 w-full ${isDarkMode ? 'bg-[#1a1a2e]/80' : 'bg-white/80'} backdrop-blur-lg border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'} shadow-lg z-50`}>
      <div className="flex justify-around items-center py-3 px-4">
        <Link
          to="/"
          className={`flex flex-col items-center text-xs ${
            path === '/' 
              ? (isDarkMode ? 'text-purple-400' : 'text-purple-600') 
              : (isDarkMode ? 'text-gray-400' : 'text-gray-500')
          }`}
        >
          <div
            className={`p-2 rounded-full transition-all duration-300 ${
              path === '/' 
                ? (isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100') 
                : (isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100')
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
        </Link>

        <Link
          to="/search"
          className={`flex flex-col items-center text-xs ${
            path === '/search'
              ? (isDarkMode ? 'text-purple-400' : 'text-purple-600')
              : (isDarkMode ? 'text-gray-400' : 'text-gray-500')
          }`}
        >
          <div
            className={`p-2 rounded-full transition-all duration-300 ${
              path === '/search'
                ? (isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100')
                : (isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100')
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </Link>

        <Link
          to="/upload"
          className={`flex flex-col items-center text-xs ${
            path === '/upload' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <div
            className={`p-2 rounded-full ${
              path === '/upload' ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>
        </Link>

        <Link
          to="/profile"
          className={`flex flex-col items-center text-xs ${
            path === '/profile' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <div
            className={`p-2 rounded-full ${
              path === '/profile' ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
