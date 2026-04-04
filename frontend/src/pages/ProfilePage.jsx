import React from 'react';
import { useStore } from '../store/useStore';
import { levels } from '../data/levels';
import { Shield, Sword, Star, Trophy, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { user, score, completedLevels, levelProgress } = useStore();

  const totalQuestionsAnswered = Object.values(levelProgress).reduce((a, b) => a + b, 0);
  const accuracy = totalQuestionsAnswered > 0 ? Math.floor(Math.random() * 20 + 80) : 0; // Mock accuracy

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white p-8 font-sans transition-colors">
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-white dark:bg-gradient-to-r dark:from-[#2a2a2a] dark:to-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 p-8 mb-8 flex items-center gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
          
          <div className="relative z-10 w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full border-4 border-indigo-500 overflow-hidden shadow-[0_0_30px_rgba(79,70,229,0.3)]">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Hero'}&backgroundColor=transparent`} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          
          <div className="relative z-10 flex-grow">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">{user?.name || 'Unknown Hero'}</h1>
            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4" /> Level {completedLevels.length + 1} Warrior
            </p>
            
            <div className="flex gap-6">
              <div className="bg-gray-50 dark:bg-black/50 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Score</div>
                  <div className="font-mono text-xl text-yellow-600 dark:text-yellow-400">{score}</div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-black/50 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <Target className="w-5 h-5 text-cyan-500" />
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Accuracy</div>
                  <div className="font-mono text-xl text-cyan-600 dark:text-cyan-400">{accuracy}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Journey Progress */}
          <div className="bg-white dark:bg-[#2a2a2a] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
              <Sword className="w-5 h-5 text-indigo-500 dark:text-indigo-400" /> Journey Progress
            </h2>
            
            <div className="space-y-6">
              {levels.map(level => {
                const isCompleted = completedLevels.includes(level.id);
                const progress = levelProgress[level.id] || 0;
                const percent = isCompleted ? 100 : (progress / 5) * 100;
                
                return (
                  <div key={level.id}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className={isCompleted ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}>{level.title}: {level.subtitle}</span>
                      <span className="font-mono text-gray-500 dark:text-gray-400">{progress}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-900 rounded-full h-2 border border-gray-300 dark:border-gray-800 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full ${isCompleted ? 'bg-green-500' : 'bg-indigo-500'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white dark:bg-[#2a2a2a] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
              <Trophy className="w-5 h-5 text-yellow-500 dark:text-yellow-400" /> Achievements
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border flex flex-col items-center text-center ${totalQuestionsAnswered >= 1 ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-600/50' : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 grayscale opacity-50'}`}>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-500/20 rounded-full flex items-center justify-center mb-2">
                  <Sword className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
                </div>
                <div className="font-bold text-sm">First Blood</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Solve 1 problem</div>
              </div>
              
              <div className={`p-4 rounded-lg border flex flex-col items-center text-center ${completedLevels.length >= 1 ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-600/50' : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 grayscale opacity-50'}`}>
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-500/20 rounded-full flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 text-cyan-600 dark:text-cyan-500" />
                </div>
                <div className="font-bold text-sm">Monster Slayer</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Clear 1 level</div>
              </div>

              <div className={`p-4 rounded-lg border flex flex-col items-center text-center ${completedLevels.length >= 5 ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-600/50' : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 grayscale opacity-50'}`}>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center mb-2">
                  <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-500" />
                </div>
                <div className="font-bold text-sm">Grandmaster</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Clear all levels</div>
              </div>
              
              <div className={`p-4 rounded-lg border flex flex-col items-center text-center ${score >= 1000 ? 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-600/50' : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 grayscale opacity-50'}`}>
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-500/20 rounded-full flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-pink-600 dark:text-pink-500" />
                </div>
                <div className="font-bold text-sm">High Scorer</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Reach 1000 score</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
