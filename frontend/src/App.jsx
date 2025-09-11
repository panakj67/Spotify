import { useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import GlobalAudioPlayer from './components/GlobalAudioPlayer'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
      <GlobalAudioPlayer />
    </ThemeProvider>
  )
}

export default App
