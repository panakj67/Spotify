import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Upload from '../pages/Upload'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Protected from '../components/Protected'
import Profile from '../pages/Profile'



const AppRoutes = () => {
    return (
        
        <Router>
            {/* <NowPlaying /> */}
            <Routes>
                {/* Public Routes */}
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />

                {/* Protected Routes */}
                <Route path="/" element={<Protected><Home /></Protected>} />
                <Route path='/search' element={<Search />} />
                <Route path="/upload" element={<Protected><Upload /></Protected>} />
                <Route path="/profile" element={<Protected><Profile /></Protected>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes