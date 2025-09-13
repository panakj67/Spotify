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
    setSongs,
    setCurrentIndex
} from '../store/features/songSlice';

const Home = () => {
    const dispatch = useDispatch();
    const songs = useSelector(selectSongs);
    const currentSong = useSelector(selectCurrentSong);
    const isPlaying = useSelector(selectIsPlaying);
    const { isDarkMode, toggleTheme } = useTheme();
    const user = useSelector(state => state.user.user)

    const handlePlaySong = (index) => {
        dispatch(setCurrentIndex(index));
        if (!isPlaying) {
            dispatch(togglePlayPause());
        }
    };

 useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get("/songs/get-songs", {
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
            <div className={`min-h-screen bg-black flex flex-col items-center justify-between px-0 pb-24 
            ${ isDarkMode ? 'bg-black' : 'bg-white'}`}>
        {/* Header */}
        <header className={`w-full sticky top-0 z-20  ${
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
        </header>

       <div className='flex flex-col flex-start w-full px-6'>
         <h1 className='text-sm text-white'>Made For</h1>
         <h1 className='text-white font-mono text-3xl'>{user?.username}</h1>
       </div>

        {/* Song List */}
        <main className="w-full  mx-auto flex-1 overflow-y-auto py-6 px-4 bg-transparent">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
               {songs.map((song, idx) => (
                 <div
                   key={song._id || idx}
                   className={`group relative flex flex-col items-center p-4 rounded-2xl cursor-pointer border transition-all duration-300
                     ${isDarkMode
                       ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50'
                       : 'bg-white border-purple-100 hover:bg-purple-50 hover:border-purple-200'
                     }`}
                   onClick={() => handlePlaySong(idx)}
                 >
                   {/* Album Poster */}
                   <div className="relative w-full aspect-square">
                     <img
                       src={song.poster}
                       className="w-full h-full rounded-lg object-cover shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                       alt={song.title}
                     />
                     {/* Play Button (centered) */}
                     <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                       <div className={`p-4 rounded-full shadow-lg
                         ${isDarkMode 
                           ? 'bg-purple-500/80 text-white hover:bg-purple-600' 
                           : 'bg-purple-500 text-white hover:bg-purple-600'
                         }`}
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" 
                           strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                           <polygon points="6 4 20 12 6 20 6 4"></polygon>
                         </svg>
                       </div>
                     </div>
                   </div>
             
                   {/* Song Info */}
                   <div className="w-full mt-3 text-center">
                     <div className={`font-semibold text-base truncate
                       ${isDarkMode ? 'text-white' : 'text-gray-800'}
                     `}>
                       {song.title}
                     </div>
                     <div className={`text-sm truncate
                       ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
                     `}>
                       {song.artist}
                     </div>
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
        <div>
          <Navigation />
        </div>
      </div>
    );
};

export default Home;
