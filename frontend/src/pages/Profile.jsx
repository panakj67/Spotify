import React from 'react';
import Navigation from '../components/Navigation';
import NowPlaying from '../components/NowPlaying';
import { useTheme } from '../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAutherised, setUser } from '../store/features/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const user = useSelector(state => state.user.user);

  const logoutHandler = async () => {
    try {
      const res = await axios.post('/auth/logout', {}, { withCredentials: true });
      if (res.status === 200) {
        dispatch(setUser(null));
        dispatch(setIsAutherised(false));
        toast.success('Logged out successfully!');
        navigate('/login');
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-between pb-24 ${
        isDarkMode
          ? 'bg-gradient-to-br from-[#121212] via-[#1f1f2e] to-[#0f0f1a]'
          : 'bg-gradient-to-br from-purple-50 via-white to-purple-50'
      }`}
    >
      <div className="w-full max-w-2xl mx-auto mt-12 px-4">
        <div
          className={`relative group backdrop-blur-xl rounded-3xl p-10 flex flex-col items-center shadow-2xl transition-all duration-500 ${
            isDarkMode
              ? 'bg-white/5 border border-white/10'
              : 'bg-white/70 border border-purple-100'
          }`}
        >
          {/* Profile Badge */}
          <div
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
              isDarkMode
                ? 'bg-purple-500/20 text-purple-400'
                : 'bg-purple-100 text-purple-600'
            }`}
          >
            PROFILE
          </div>

          {/* Avatar */}
          <div className="relative mb-8 group">
            <div
              className={`absolute -inset-2 rounded-full blur-xl opacity-60 transition-all duration-500 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-purple-500/50 to-pink-500/50 group-hover:opacity-100'
                  : 'bg-gradient-to-r from-purple-400/30 to-pink-400/30 group-hover:opacity-100'
              }`}
            ></div>
            <div
              className={`relative z-10 p-1 rounded-full shadow-xl ${
                isDarkMode
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'bg-gradient-to-r from-purple-400 to-pink-400'
              }`}
            >
              <img
                src="https://tse2.mm.bing.net/th/id/OIP.PM7su-Y3XB0eajQgrneVHQHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3"
                alt="Profile Avatar"
                className="w-32 h-32 rounded-full object-cover shadow-lg"
              />
            </div>
          </div>

          {/* User Info */}
          <h2
            className={`text-4xl font-extrabold mb-2 tracking-wide ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            {user ? user.username : 'new_user'}
          </h2>
          <p
            className={`text-sm mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-medium`}
          >
            Welcome back! Ready to vibe?
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 w-full max-w-sm mb-8">
            {[
              { label: 'Uploads', value: '12' },
              { label: 'Playlists', value: '5' },
              { label: 'Liked', value: '48' },
            ].map(stat => (
              <div
                key={stat.label}
                className={`text-center p-4 rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                  isDarkMode
                    ? 'bg-white/5 border border-white/10 shadow-md'
                    : 'bg-white border border-purple-100 shadow-sm'
                }`}
              >
                <div
                  className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                isDarkMode
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:opacity-90'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90'
              }`}
            >
              Edit Profile
            </button>
            <button
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                isDarkMode
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
              }`}
            >
              Settings
            </button>
            <button
              onClick={logoutHandler}
              className={`px-6 py-3 cursor-pointer rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                isDarkMode
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  : 'bg-red-100 text-red-600 hover:bg-red-200'
              }`}
            >
              Logout
            </button>
          </div>

          {/* Privacy Badge */}
          <div
            className={`mt-8 px-4 py-2 rounded-full text-xs shadow-inner ${
              isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-purple-50 text-purple-600'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Your profile is private
            </span>
          </div>
        </div>

        {/* Now Playing */}
        {false && (
          <div className="mt-6">
            <NowPlaying
              currentSong={null}
              isPlaying={false}
              togglePlayPause={() => {}}
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 w-full z-50">
        <Navigation />
      </div>
    </div>
  );
};

export default Profile;
