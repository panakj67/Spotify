import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import GlobalAudioPlayer from './components/GlobalAudioPlayer'
import { ThemeProvider } from './context/ThemeContext'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
      <GlobalAudioPlayer />
    </ThemeProvider>
  )
}

export default App
