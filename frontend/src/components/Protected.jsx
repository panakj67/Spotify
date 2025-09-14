import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import api from '../services/api'
import Login from '../pages/Login'
import { useSelector } from 'react-redux'

const Protected = ({ children }) => {
    const navigate = useNavigate();
    // const [isLoading, setIsLoading] = useState(true);
    const { isDarkMode } = useTheme();
    const isAutherised = useSelector(state => state.user.isAutherised);
    const loading = useSelector(state => state.user.loading)

    // console.log(isAutherised);
    

    if (loading) {
        return (
            <div
        className={`flex flex-col items-center text-blue-600 ${isDarkMode ? "bg-black" : "bg-gradient-to-tr from-white via-indigo-50 to-indigo-100"} 
 justify-center h-screen`}
      >
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin"></div>
        <p className="mt-6 text-xl font-semibold animate-pulse tracking-wide">
          Loading, please wait...
        </p>
      </div>
        );
    }

    return isAutherised ? children : <Login />;
}

export default Protected