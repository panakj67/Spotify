import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentSong,
  selectIsPlaying,
  togglePlayPause,
  nextSong,
  prevSong,
  setProgress,
  selectProgress,
  toggleShow,
  selectDuration,
  seekSong,
  setRepeat,
  selectRepeat,
  toggleSuffle,
  selectSuffle,
} from "../store/features/songSlice";

// React Icons
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaRandom, FaRedo } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const NowPlaying = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentSong = useSelector(selectCurrentSong);
  const isPlaying = useSelector(selectIsPlaying);
  const progress = useSelector(selectProgress);
  const duration = useSelector(selectDuration);
  const show = useSelector((state) => state.songs.show);
  const darkTheme = useTheme().isDarkMode;
  const repeat = useSelector(selectRepeat)
  const suffle = useSelector(selectSuffle)

  const audioRef = useRef(null);

  const handleSeek = (e) => {
    const value = Number(e.target.value);
    dispatch(seekSong(value));
  };

  if (!currentSong) return null;

  return (
        <div
          onClick={() => navigate('/player')}
          className={`fixed bottom-20 bg-gradient-to-r from-indigo-500/20 to-purple-500/30
             cursor-pointer left-1/2 transform -translate-x-1/2 bg-white shadow-lg w-[90vw] max-w-md rounded-2xl flex flex-col px-4 sm:px-6 z-50 border border-gray-200 py-2`}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 flex-1 truncate">
              <img
                src={currentSong.poster}
                alt={currentSong.title}
                className="w-12 h-12 rounded-lg object-cover border border-gray-300 shadow-sm"
              />
              <div className="truncate">
                <div className="text-sm font-semibold text-gray-800 truncate">
                  {currentSong.title}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {currentSong.artist}
                </div>
              </div>
            </div>

            <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 ml-2">
              <button onClick={() => dispatch(toggleSuffle())} className={`${ !suffle ? "text-gray-600 hover:text-black" :
                              "text-green-600 hover:text-green-500"
                             } cursor-pointer`}>  <FaRandom size={15} />
                            </button>
              <button
                onClick={() => dispatch(prevSong())}
                className="cursor-pointer text-gray-700 hover:text-black"
              >
                <FaStepBackward size={20} />
              </button>

              <button
                onClick={() => dispatch(togglePlayPause())}
                className="w-10 h-10 rounded-full cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md active:scale-95 transition"
              >
                {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
              </button>

              <button
                onClick={() => dispatch(nextSong())}
                className="cursor-pointer text-gray-700 hover:text-black"
              >
                <FaStepForward size={20} />
              </button>
              <button onClick={() => dispatch(setRepeat(!repeat))} className={`${ !repeat ? "text-gray-600 hover:text-black" :
                              "text-green-600 hover:text-green-500"
                             } cursor-pointer`}>
                              <FaRedo size={15} />
                            </button>
            </div>
          </div>

          {/* Bottom Slider */}
          <div onClick={(e) => e.stopPropagation()}>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={progress}
              onChange={handleSeek}
              className="w-full mt-2 accent-purple-500 transition-all duration-200 ease-linear cursor-pointer"
            />
          </div>
        </div>
     
  );
};

export default NowPlaying;
