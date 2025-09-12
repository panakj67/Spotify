import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navigation from '../components/Navigation'
import { useTheme } from '../context/ThemeContext';
import { useDispatch } from 'react-redux';
import { setLoading } from '../store/features/userSlice';
import toast from 'react-hot-toast';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null); // ✅ added for preview
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('chacha', audioFile); // ✅ fixed from 'chacha' to 'audio'
    dispatch(setLoading(true));
    axios.post('/songs/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
      toast.success('Music uploaded successfully!')
      navigate('/');
    })
    .catch((err) => {
      toast.error('Upload failed, Please try again.')
      console.error('Upload error:', err);
    });
    dispatch(setLoading(false));
  };

  return (
    <section className={`min-h-screen flex flex-col justify-between p-6 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f172a]' 
          : 'bg-gradient-to-br from-purple-50 via-white to-purple-50'
      }`}>
      <div className={`max-w-md mx-auto w-full backdrop-blur-xl shadow-2xl rounded-3xl p-8 mt-8 border ${
        isDarkMode 
          ? 'bg-white/10 border-white/10' 
          : 'bg-white/70 border-purple-100'
      }`}>
        <div className="flex items-center space-x-4 mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className={`p-2 rounded-xl transition-all duration-300 ${
              isDarkMode 
                ? 'text-white/80 hover:text-white hover:bg-white/10' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-purple-100'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Upload Music</h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className={`text-sm ml-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Song Title</label>
            <input
              type="text"
              placeholder="Enter the song title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 focus:border-purple-500/50 text-white placeholder:text-gray-400' 
                  : 'bg-white border-purple-100 focus:border-purple-400 text-gray-900 placeholder:text-gray-400'
              } border focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
            />
          </div>

          <div className="space-y-2">
            <label className={`text-sm ml-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Artist Name</label>
            <input
              type="text"
              placeholder="Enter the artist name"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 focus:border-purple-500/50 text-white placeholder:text-gray-400' 
                  : 'bg-white border-purple-100 focus:border-purple-400 text-gray-900 placeholder:text-gray-400'
              } border focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
            />
          </div>

          {/* Audio File Input */}
          <div className="space-y-2">
            <label className={`text-sm ml-1 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Audio File</label>
            <div className="relative">
              <label className={`flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 group ${
                isDarkMode
                  ? 'bg-white/5 border-purple-500/30 hover:bg-white/10'
                  : 'bg-purple-50/50 border-purple-200 hover:bg-purple-50'
              }`}>
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" 
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                    className={`transition-colors duration-300 mb-3 ${
                      isDarkMode
                        ? 'text-purple-400 group-hover:text-purple-300'
                        : 'text-purple-500 group-hover:text-purple-600'
                    }`}>
                    <path d="M21 15v4a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span className={`text-sm transition-colors ${
                    isDarkMode
                      ? 'text-purple-400 group-hover:text-purple-300'
                      : 'text-purple-600 group-hover:text-purple-700'
                  }`}>Click to upload audio file</span>
                  <span className={`text-xs mt-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>MP3, WAV files supported</span>
                </div>
                <input
                  type="file"
                  accept="audio/*"
                  required
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setAudioFile(file);
                    if (file) {
                      setAudioPreview(URL.createObjectURL(file)); // ✅ preview URL
                    }
                  }}
                  className="hidden"
                />
              </label>
            </div>

            {/* ✅ Audio Preview */}
            {audioPreview && (
              <div className="mt-4">
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Preview:</p>
                <audio controls src={audioPreview} className="w-full mt-2" />
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-3 mb-10 rounded-xl cursor-pointer font-semibold transform hover:scale-[1.02] transition-all duration-300 mt-8 ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
            }`}
          >
            Upload Music
          </button>
        </form>

        {/* Navigation */}
        <div className=" w-full ">
          <Navigation />
        </div>
      </div>
    </section>
  );
};

export default Upload;
