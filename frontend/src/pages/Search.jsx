import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../components/Navigation';
import NowPlaying from '../components/NowPlaying';
import { useTheme } from '../context/ThemeContext';
import {
  setSongs,
  setFilteredSongs,
  setCurrentSong,
  togglePlayPause,
  selectFilteredSongs,
  selectCurrentSong,
  selectIsPlaying
} from '../store/features/songSlice';
import api, { API_ENDPOINTS } from '../services/api';

const Search = () => {
  const dispatch = useDispatch();
  const filteredSongs = useSelector(selectFilteredSongs);
  const currentSong = useSelector(selectCurrentSong);
  const isPlaying = useSelector(selectIsPlaying);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  const fetchAndFilterSongs = async (query) => {
    try {
      const res = await api.get(API_ENDPOINTS.GET_SONGS);

      if (res.data?.songs && Array.isArray(res.data.songs)) {
        return res.data.songs.filter(song =>
          song.title?.toLowerCase().includes(query.toLowerCase()) ||
          song.artist?.toLowerCase().includes(query.toLowerCase())
        );
      }

      return [];
    } catch (err) {
      console.error('Error fetching all songs:', err);
      throw err;
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    const controller = new AbortController();

    const performSearch = async () => {
      try {
        const res = await api.get(API_ENDPOINTS.SEARCH, {
          params: { text: searchQuery.trim() },
          signal: controller.signal
        });

        if (!isSubscribed) return false;

        if (res.data && Array.isArray(res.data.songs)) {
          dispatch(setFilteredSongs(res.data.songs));
          return true;
        }
        return false;
      } catch (err) {
        if (err.name === 'CanceledError' || !isSubscribed) return false;
        throw err;
      }
    };

    const handleSearch = async () => {
      if (searchQuery.trim() === '') {
        dispatch(setFilteredSongs([]));
        setError(null);
        setIsUsingFallback(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setIsUsingFallback(false);

      try {
        const searchSuccessful = await performSearch();
        if (!isSubscribed) return;
        
        if (!searchSuccessful) {
          dispatch(setFilteredSongs([]));
        }
      } catch (err) {
        if (!isSubscribed) return;
        console.error('Primary search failed:', err);

        if (err.response?.status === 401) {
          setError('Please login to search songs');
          return;
        }

        // Don't try fallback for 401, just show login message
        if (err.response?.status === 401) {
          setError('Please login to access more features');
          setIsLoading(false);
          return;
        }

        // For other errors, try fallback search
        try {
          const filteredSongs = await fetchAndFilterSongs(searchQuery);
          if (!isSubscribed) return;

          setIsUsingFallback(true);
          if (filteredSongs.length > 0) {
            dispatch(setFilteredSongs(filteredSongs));
            setError('Using local search results.');
          } else {
            dispatch(setFilteredSongs([]));
            setError('No matching songs found.');
          }
        } catch (fallbackErr) {
          if (!isSubscribed) return;
          console.error('Fallback search failed:', fallbackErr);
          dispatch(setFilteredSongs([]));
          setError('Search is currently unavailable. Please try again later.');
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    const timer = setTimeout(handleSearch, 500);

    return () => {
      isSubscribed = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [searchQuery, dispatch]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePlaySong = (song) => {
    dispatch(setCurrentSong(song));
    dispatch(togglePlayPause());
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-between px-0 pb-24 ${
      isDarkMode
        ? 'bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f172a]'
        : 'bg-gradient-to-br from-purple-50 via-white to-purple-50'
    }`}>
      
      <header className={`w-full sticky top-0 z-30 px-0 pt-0 pb-0 shadow-lg ${
        isDarkMode ? 'bg-black/30 backdrop-blur-lg' : 'bg-white/70 backdrop-blur-lg'
      }`}>
        <div className="flex flex-col items-center justify-center py-6 px-4">
          <div className="flex items-center gap-4 mb-6">
            <img
              className='h-12 w-12 shadow-2xl rounded-2xl object-cover transform rotate-12'
              src='https://th.bing.com/th/id/R.ae55227397e7147121e094f8e2f74a73?rik=zXzl4Bhg7rCp0w&riu=http%3A%2F%2Forig05.deviantart.net%2F8698%2Ff%2F2015%2F245%2Fc%2F9%2Fapple_music_logo_by_mattroxzworld-d982zrj.png&ehk=0g0dvvSHP6JWZKat6ZPA1Dx5m6PmhuErbEdzVmmyNHM%3D&risl=&pid=ImgRaw&r=0'
              alt="logo"
            />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Search Music
            </h1>
          </div>
          <div className="w-full max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Type to search songs or artists..."
                value={searchQuery}
                onChange={handleSearch}
                className={`w-full py-4 pl-12 pr-4 rounded-xl text-lg transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 focus:border-purple-500/50 text-white placeholder:text-gray-400'
                    : 'bg-white border-purple-100 focus:border-purple-400 text-gray-900 placeholder:text-gray-400'
                } border focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              />
              <span className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full max-w-2xl mx-auto flex-1 overflow-y-auto py-6 px-4 bg-transparent">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              <p className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Searching...</p>
            </div>
          </div>
        ) : error ? (
          <div className={`p-4 rounded-xl ${
            isDarkMode
              ? isUsingFallback ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'
              : isUsingFallback ? 'bg-yellow-50 border border-yellow-100 text-yellow-600' : 'bg-red-50 border border-red-100 text-red-600'
          }`}>
            <p className="text-center">{error}</p>
          </div>
        ) : searchQuery.trim() === '' ? (
          <div className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>Type something to search for songs...</p>
          </div>
        ) : filteredSongs.length === 0 ? (
          <div className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <p>No songs found for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredSongs.map((song, idx) => (
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
                  <div className="text-sm text-[#4e54c8] truncate font-medium">{song.artist}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {currentSong && (
        <div className="fixed bottom-16 left-0 w-full px-2 z-40">
          <NowPlaying
            currentSong={currentSong}
            isPlaying={isPlaying}
            togglePlayPause={() => dispatch(togglePlayPause())}
          />
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full z-50">
        <Navigation />
      </div>
    </div>
  );
};

export default Search;
