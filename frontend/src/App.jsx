import { useEffect, useState } from 'react'
import AppRoutes from './routes/AppRoutes'
import GlobalAudioPlayer from './components/GlobalAudioPlayer'
import { ThemeProvider } from './context/ThemeContext'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAutherised, setLoading, setUser } from './store/features/userSlice'
import { Toaster} from 'react-hot-toast'
import { setSongs } from './store/features/songSlice'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.user.loading)
  // console.log(loading);
  
  

  const fetchUser = async () => {
    dispatch(setLoading(true))
    try {
      const res = await axios.get('/auth/me')
      console.log(res.data);
      dispatch(setUser(res.data.user))
      dispatch(setIsAutherised(true));
    } catch(error) {
      console.log(error.message);
    } finally {
      dispatch(setLoading(false))
    }
  }

   useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get("/songs/get-songs", {
                    withCredentials: true
                });
                dispatch(setSongs(response.data.songs));
            } catch (error) {
                if (error.response?.status === 401) {
                    window.location.href = '/login';
                }
                console.error("Error fetching songs:", error);
            }
        };

        fetchSongs();
    }, [dispatch]);

  useEffect(() => {
    fetchUser()
  },[])

  return (
    <ThemeProvider>
      <Toaster/>
      <AppRoutes />
      <GlobalAudioPlayer />
    </ThemeProvider>
  )
}

export default App
