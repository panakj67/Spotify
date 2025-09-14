import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useSelector } from "react-redux";

const navItems = [
  {
    to: "/",
    label: "Home",
    icon: (
      <>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </>
    ),
  },
  {
    to: "/search",
    label: "Search",
    icon: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    ),
  },
  {
    to: "/upload",
    label: "Upload",
    icon: (
      <>
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </>
    ),
  },
  {
    to: "/profile",
    label: "Profile",
    icon: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
  },
];

const Navigation = (bgColor) => {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const show = useSelector(state => state.songs.show);
  
  

  return (
    <div
      className={`fixed bottom-0 left-0 w-full backdrop-blur-xl border-t shadow-lg z-50
      ${isDarkMode ? "bg-black" : "bg-white/90 border-gray-200"}`}
    >
      <div className="flex justify-around items-center py-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center text-xs transition-all duration-300
                ${isActive
                  ? isDarkMode
                    ? "text-purple-400"
                    : "text-purple-600"
                  : isDarkMode
                  ? "text-gray-400 hover:text-purple-300"
                  : "text-gray-500 hover:text-purple-500"
                }`}
            >
              <div
                className={`p-2 rounded-full transition-all duration-300
                  ${isActive
                    ? isDarkMode
                      ? "bg-purple-500/20 ring-2 ring-purple-500/30"
                      : "bg-purple-100 ring-2 ring-purple-300/50"
                    : isDarkMode
                    ? "hover:bg-white/5"
                    : "hover:bg-gray-100"
                  }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {item.icon}
                </svg>
              </div>
              <span className="mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  )
};

export default Navigation;
