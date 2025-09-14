import React from 'react'
import { FaRandom, FaStepBackward, FaPause, FaPlay, FaStepForward, FaRedo } from 'react-icons/fa'
import {
  selectCurrentSong,
  selectIsPlaying,
  togglePlayPause,
  nextSong,
  prevSong,
  selectProgress,
  toggleShow,
  selectDuration,
  seekSong,
} from '../store/features/songSlice'
import { useTheme } from '../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Player = () => {
    const currentSong = useSelector(selectCurrentSong);
  const isPlaying = useSelector(selectIsPlaying);
  const progress = useSelector(selectProgress);
  const duration = useSelector(selectDuration);
  const show = useSelector((state) => state.songs.show);
  const darkTheme = useTheme().isDarkMode;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSeek = (e) => {
      const value = Number(e.target.value);
      dispatch(seekSong(value));
    };

  if(!currentSong) return null;

  return (
    <div className="w-full h-full">
          <div  className={`fixed inset-0 flex flex-col items-center justify-center text-white z-50 p-6 ${
    darkTheme
      ? 'bg-gradient-to-b from-[#1a1a2e] via-[#241655] to-black'
      : 'bg-gradient-to-b from-[#f0f0f0] via-[#d1c4e9] to-[#ffffff]'
  }`}>
            
            <img
              src={currentSong.poster}
              alt={currentSong.title}
              className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl object-cover shadow-xl mb-6"
            />

            <div className="text-center mb-4">
              <h2 className="text-xl font-bold truncate">{currentSong.title}</h2>
              <p className="text-gray-400 text-sm">{currentSong.artist}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md flex items-center gap-2 mb-4">
              <button
                onClick={() => navigate(-1)}
                className="mt-6 text-white hover:text-red-600 transition ease text-xl absolute top-0 right-4 cursor-pointer"
              >
                X
              </button>

              <span className="text-xs text-gray-400">
                {Math.floor(progress / 60)}:{String(Math.floor(progress % 60)).padStart(2, "0")}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={progress}
                onChange={handleSeek}
                className="flex-1 accent-purple-500 cursor-pointer"
              />
              <span className="text-xs text-gray-400">
                {duration
                  ? `${Math.floor(duration / 60)}:${String(Math.floor(duration % 60)).padStart(2, "0")}`
                  : "0:00"}
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
              <button className="text-gray-400 hover:text-white cursor-pointer">
                <FaRandom size={20} />
              </button>

              <button
                onClick={() => dispatch(prevSong())}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <FaStepBackward size={22} />
              </button>

              <button
                onClick={() => dispatch(togglePlayPause())}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-xl hover:scale-105 transition cursor-pointer"
              >
                {isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
              </button>

              <button
                onClick={() => dispatch(nextSong())}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <FaStepForward size={22} />
              </button>

              <button className="text-gray-400 hover:text-white cursor-pointer">
                <FaRedo size={20} />
              </button>
            </div>
          </div>
        </div>
  )
}

export default Player