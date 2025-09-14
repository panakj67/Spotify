import React from 'react'
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div className={`w-full sticky top-0 z-20  ${
          isDarkMode ? 'bg-black' : 'bg-white/70'
        } px-6 py-2 flex justify-between items-center`}>
          <h1 className="text-3xl font-bold flex gap-4 items-center tracking-wider">
            <img
              className='h-12 w-12 shadow-2xl rounded-2xl object-cover transform rotate-12'
              src='https://th.bing.com/th/id/R.ae55227397e7147121e094f8e2f74a73?rik=zXzl4Bhg7rCp0w&riu=http%3a%2f%2forig05.deviantart.net%2f8698%2ff%2f2015%2f245%2fc%2f9%2fapple_music_logo_by_mattroxzworld-d982zrj.png&ehk=0g0dvvSHP6JWZKat6ZPA1Dx5m6PmhuErbEdzVmmyNHM%3d&risl=&pid=ImgRaw&r=0'
              alt="logo"
            />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Stream</span>
          </h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className={`p-2 rounded-full cursor-pointer transition-all ${
                isDarkMode 
                  ? 'text-gray-400 hover:bg-white/10' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" 
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" 
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <Link to="/search" className={`p-2 rounded-full transition-all ${
              isDarkMode 
                ? 'text-gray-400 hover:bg-white/10' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="hover:scale-110 transition">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </Link>
          </div>
        </div>
  )
}

export default Navbar