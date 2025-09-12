import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { useDispatch } from 'react-redux';
import { setIsAutherised, setLoading, setUser } from '../store/features/userSlice'; 
import toast from 'react-hot-toast';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isDarkMode } = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        '/auth/login',
        { username, password },
        { withCredentials: true }
      );
      
      dispatch(setUser(response.data.user));
      dispatch(setIsAutherised(true));
      toast.success('Logged in successfully!')
      navigate('/');
    } catch (err) {
      toast.error('Login failed. Please check your credentials.');
      setError('Invalid username or password');
    } finally{
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={`min-h-screen flex justify-center items-center py-10 px-3 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f172a]' 
          : 'bg-gradient-to-br from-purple-50 via-white to-purple-50'
      }`}>
      <main className={`w-[400px] backdrop-blur-xl rounded-3xl p-8 ${
        isDarkMode
          ? 'bg-white/10 border border-white/10'
          : 'bg-white/70 border border-purple-100'
      }`}>
        <h1 className={`text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text`}>
          Welcome Back
        </h1>
        <p className={`text-center mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Sign in to your account
        </p>

        <section className="flex gap-4 justify-center mb-8">
          <button className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
            isDarkMode
              ? 'bg-white/5 hover:bg-white/10 border border-white/10'
              : 'bg-white hover:bg-purple-50 border border-purple-100'
          }`}>
            <img
              className="h-6 w-6"
              src="https://th.bing.com/th?q=Google+Logo+Small+Size&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"
              alt="Google"
            />
            <span className={isDarkMode ? 'text-white' : 'text-gray-700'}>Google</span>
          </button>
          <button className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
            isDarkMode
              ? 'bg-white/5 hover:bg-white/10 border border-white/10'
              : 'bg-white hover:bg-purple-50 border border-purple-100'
          }`}>
            <img
              className="h-5 w-5"
              src="https://clipart-library.com/images_k/apple-logo-png-transparent-background/apple-logo-png-transparent-background-11.png"
              alt="Apple"
            />
            <span className={isDarkMode ? 'text-white' : 'text-gray-700'}>Apple</span>
          </button>
        </section>

        <div className="flex items-center gap-4 mb-8">
          <div className={`flex-1 h-px ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>or</span>
          <div className={`flex-1 h-px ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className={`text-sm ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Username
            </label>
            <input
              className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 focus:border-purple-500/50 text-white placeholder:text-gray-400' 
                  : 'bg-white border-purple-100 focus:border-purple-400 text-gray-900 placeholder:text-gray-400'
              } border focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              type="text"
              placeholder="Enter your username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className={`text-sm ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Password
            </label>
            <input
              className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 focus:border-purple-500/50 text-white placeholder:text-gray-400' 
                  : 'bg-white border-purple-100 focus:border-purple-400 text-gray-900 placeholder:text-gray-400'
              } border focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-semibold transform hover:scale-[1.02] transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
            }`}
          >
            Sign In
          </button>

          <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-semibold hover:opacity-80 transition-opacity"
            >
              Register
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;
