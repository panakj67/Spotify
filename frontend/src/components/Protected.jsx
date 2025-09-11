import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import api from '../services/api'

const Protected = ({ children }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        api.get('/auth/me')
        .then(response => {
            setIsLoading(false);
        })
        .catch(() => {
            navigate("/login");
        });
    }, [navigate]);

    if (isLoading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${
                isDarkMode 
                    ? 'bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f172a]' 
                    : 'bg-gradient-to-br from-purple-50 via-white to-purple-50'
            }`}>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                    <p className={`mt-4 text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Loading...</p>
                </div>
            </div>
        );
    }

    return children;
}

export default Protected