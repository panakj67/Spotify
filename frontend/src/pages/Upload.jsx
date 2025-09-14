import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navigation from '../components/Navigation'
import { useTheme } from '../context/ThemeContext'
import toast from 'react-hot-toast'

const Upload = () => {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [poster, setPoster] = useState('')
  const [audioFile, setAudioFile] = useState(null)
  const [audioPreview, setAudioPreview] = useState(null)
  const { isDarkMode } = useTheme()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!audioFile) {
      toast.error("Please select an audio file")
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('artist', artist)
    formData.append('poster', poster)
    formData.append('audio', audioFile)

    try {
      const response = await axios.post('/songs/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })

      toast.success('Music uploaded successfully!')
      navigate('/')
    } catch (err) {
      console.error('Upload error:', err)
      toast.error('Upload failed, Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      if (audioPreview) URL.revokeObjectURL(audioPreview)
    }
  }, [audioPreview])

  return (
    <section className={`min-h-[90vh] flex flex-col justify-between pb-20 p-6 ${
  isDarkMode 
    ? 'bg-black' 
    : 'bg-gradient-to-br from-purple-50 via-white to-purple-50'
}`}>
      <div className={`max-w-xl mx-auto scroll w-full backdrop-blur-xl shadow-2xl rounded-2xl px-4 sm:px-8 pt-4 mt-4 border 
      ${
        isDarkMode
          ? 'bg-gradient-to-br from-[#121212] via-[#1f1f2e] to-[#0f0f1a]'
          : 'bg-gradient-to-br from-purple-50 via-white to-purple-50 border-purple-200'
      }`} style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-60">
            <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin border-blue-700 shadow-lg"></div>
            <p className={`mt-4 animate-pulse ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Uploading... please wait</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center mb-8 space-x-3">
              <button 
                onClick={() => navigate(-1)} 
                className={`rounded-xl p-2 transition-all duration-300 ${
                  isDarkMode 
                    ? 'text-white/80 hover:text-white hover:bg-white/10' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-purple-100'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" 
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                Upload Music
              </h1>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Title */}
              <div className="space-y-1">
                <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Song Title:</label>
                <input
                  type="text"
                  placeholder="Enter song title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className={`w-full px-4 py-2 rounded-lg transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-purple-500/50'
                      : 'bg-white border-purple-100 text-gray-900 placeholder:text-gray-400 focus:border-purple-400'
                  }`}
                />
              </div>

              {/* Artist */}
              <div className="space-y-1">
                <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Artist Name:</label>
                <input
                  type="text"
                  placeholder="Enter artist name"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  required
                  className={`w-full px-4 py-2 rounded-lg transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-purple-500/50'
                      : 'bg-white border-purple-100 text-gray-900 placeholder:text-gray-400 focus:border-purple-400'
                  }`}
                />
              </div>

              {/* Poster */}
              <div className="space-y-1">
                <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Poster Link (optional):</label>
                <input
                  type="text"
                  placeholder="Enter poster URL"
                  value={poster}
                  onChange={(e) => setPoster(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-purple-500/50'
                      : 'bg-white border-purple-100 text-gray-900 placeholder:text-gray-400 focus:border-purple-400'
                  }`}
                />
              </div>

              {/* Audio Upload */}
              <div className="space-y-1">
                <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Audio File:</label>
                <label className={`flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 group ${
                  isDarkMode
                    ? 'bg-white/5 border-purple-500/30 hover:bg-white/10'
                    : 'bg-purple-50 border-purple-200 hover:bg-purple-50'
                }`}>
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" 
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                      className={`transition-colors duration-300 mb-2 ${
                        isDarkMode
                          ? 'text-purple-400 group-hover:text-purple-300'
                          : 'text-purple-500 group-hover:text-purple-600'
                      }`}>
                      <path d="M21 15v4a2 2 0 0 1-2 2h-14a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span className={`text-sm ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Click to upload audio file</span>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>MP3, WAV supported</span>
                  </div>
                  <input
                    type="file"
                    accept="audio/*"
                    required
                    onChange={(e) => {
                      const file = e.target.files[0]
                      setAudioFile(file)
                      if (file) setAudioPreview(URL.createObjectURL(file))
                    }}
                    className="hidden"
                  />
                </label>
                {audioPreview && (
                  <div className="mt-2">
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Preview:</p>
                    <audio controls src={audioPreview} className="w-full mt-1" />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={`w-full py-3 mt-6 mb-10 rounded-xl font-semibold cursor-pointer transform hover:scale-[1.02] transition-all duration-300 ${
    isDarkMode
      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25'
      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
  }`}
              >
                Upload Music
              </button>
            </form>
          </>
        )}

        
      </div>
      {/* Navigation */}
        <Navigation />
    </section>
  )
}

export default Upload
