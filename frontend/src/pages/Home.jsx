import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

import Navigation from '../components/Navigation';
import NowPlaying from '../components/NowPlaying';
import {
    setCurrentSong,
    togglePlayPause,
    selectSongs,
    selectCurrentSong,
    selectIsPlaying,
    setSongs
} from '../store/features/songSlice';

const Home = () => {
    const dispatch = useDispatch();
    const songs = useSelector(selectSongs);
    const currentSong = useSelector(selectCurrentSong);
    const isPlaying = useSelector(selectIsPlaying);
    const { isDarkMode, toggleTheme } = useTheme();

    const handlePlaySong = (song) => {
        dispatch(setCurrentSong(song));
    };

 useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get("https://song-steam-backend.onrender.com/songs/get-songs", {
                    withCredentials: true
                });
                dispatch(setSongs(response.data.songs));
            } catch (error) {
                if (error.response?.status === 401) {
                    window.location.href = '/login';
                }
                console.error("Error fetching songs:", error);
            }
        };

        fetchSongs();
    }, [dispatch]);

    return (
            <div className={`min-h-screen flex flex-col items-center justify-between px-0 pb-24 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f172a]' 
          : 'bg-gradient-to-br from-purple-50 via-white to-purple-50'
      }`}>
        {/* Header */}
        <header className={`w-full sticky top-0 z-20 backdrop-blur-lg ${
          isDarkMode ? 'bg-black/30' : 'bg-white/70'
        } px-6 py-5 flex justify-between items-center`}>
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
              className={`p-2 rounded-full transition-all ${
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
        </header>

        {/* Song List */}
        <main className="w-full max-w-2xl mx-auto flex-1 overflow-y-auto py-6 px-4 bg-transparent">
          <div className="grid gap-4">
            {songs.map((song, idx) => (
              <div
                key={song._id || idx}
                className={`flex items-center p-4 backdrop-blur-md rounded-2xl cursor-pointer border transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50'
                    : 'bg-white border-purple-100 hover:bg-purple-50 hover:border-purple-200'
                }`}
                onClick={() => handlePlaySong(song)}
              >
                <img
                  src={song.poster}
                  className="w-16 h-16 rounded-xl object-cover mr-4 shadow-lg transform hover:scale-105 transition-transform duration-300"
                  alt={song.title}
                />
                <div className="flex-1">
                  <div className={`font-semibold text-lg mb-1 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>{song.title}</div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>{song.artist}</div>
                </div>
                <div className={`ml-4 p-3 rounded-full transition-colors ${
                  isDarkMode
                    ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                    : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" 
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Floating Now Playing Bar */}
        <div className="fixed bottom-16 left-0 w-full px-2 z-40">
          <NowPlaying
            currentSong={currentSong}
            isPlaying={isPlaying}
            togglePlayPause={() => dispatch(togglePlayPause())}
          />
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 w-full z-50">
          <Navigation />
        </div>
      </div>
    );
};

export default Home;
