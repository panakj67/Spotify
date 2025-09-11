import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentSong,
  selectIsPlaying,
  togglePlayPause,
} from '../store/features/songSlice';

const NowPlaying = ({
  currentSong: songProp,
  isPlaying: isPlayingProp,
  togglePlayPause: togglePlayPauseProp,
}) => {
  const dispatch = useDispatch();
  const reduxCurrentSong = useSelector(selectCurrentSong);
  const reduxIsPlaying = useSelector(selectIsPlaying);

  const currentSong = songProp || reduxCurrentSong;
  const isPlaying = isPlayingProp !== undefined ? isPlayingProp : reduxIsPlaying;

  const handleTogglePlayPause = () => {
    if (togglePlayPauseProp) {
      togglePlayPauseProp();
    } else {
      dispatch(togglePlayPause());
    }
  };

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg w-[90vw] max-w-md h-20 rounded-2xl flex items-center justify-between px-4 sm:px-6 z-50 border border-gray-200">
      <img
        src={currentSong.poster}
        alt={currentSong.title}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border border-gray-300 shadow-sm"
      />
      <div className="flex-1 mx-3 truncate">
        <div className="text-sm font-semibold text-gray-800 truncate">{currentSong.title}</div>
        <div className="text-xs text-gray-500 truncate">{currentSong.artist}</div>
      </div>
      <button
        onClick={handleTogglePlayPause}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md active:scale-95 transition"
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        )}
      </button>
    </div>
  );
};

export default NowPlaying;
