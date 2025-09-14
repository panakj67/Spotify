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
import Navbar from '../components/Navbar';

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
        <Navbar />
       
       {/* Greeting section */}
       <div className='flex flex-col flex-start w-full px-6'>
         <h1 className={`text-sm ${ isDarkMode ? "text-white" : "text-pink-500" }`}>Made For</h1>
         <h1 className={`${isDarkMode ? "text-white" : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text w-fit"} font-mono text-3xl`}>{user?.username}</h1>
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
