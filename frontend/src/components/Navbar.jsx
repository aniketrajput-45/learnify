import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Sword, User, LogOut, Trophy, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { user, logout, theme, setTheme } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ rotate: 180 }} 
              transition={{ duration: 0.3 }}
            >
              <Sword className="w-8 h-8 text-yellow-500" />
            </motion.div>
            <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Algo<span className="text-yellow-500">Quest</span>
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <>
                <Link to="/levels" className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors uppercase tracking-wider">
                  Arena
                </Link>
                <Link to="/leaderboard" className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors uppercase tracking-wider flex items-center gap-1">
                  <Trophy className="w-4 h-4" /> Leaderboard
                </Link>
                <Link to="/profile" className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <User className="w-5 h-5" />
                </Link>
                <button onClick={handleLogout} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="px-6 py-2 rounded bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-colors uppercase tracking-wider text-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
