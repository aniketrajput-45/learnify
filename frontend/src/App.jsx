import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import SkillTreePage from './pages/SkillTreePage';
import BattleScreen from './pages/BattleScreen';
import LeaderboardPage from './pages/LeaderboardPage';

// Components
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children }) => {
  const user = useStore((state) => state.user);
  if (!user) return <Navigate to="/auth" />;
  return children;
};

export default function App() {
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white transition-colors duration-300 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/levels" 
            element={
              <ProtectedRoute>
                <SkillTreePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/battle/:levelId" 
            element={
              <ProtectedRoute>
                <BattleScreen />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/leaderboard" 
            element={
              <ProtectedRoute>
                <LeaderboardPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}
