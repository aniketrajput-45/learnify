import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { levels } from '../data/levels';
import { Lock } from 'lucide-react';

export default function SkillTreePage() {
  const { completedLevels, levelProgress, score } = useStore();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white p-8 font-sans transition-colors">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-yellow-500 dark:text-yellow-400 tracking-tight mb-4 drop-shadow-md">
            Choose Your Battle
          </h1>
          <p className="text-xl text-pink-600 dark:text-pink-500 font-mono">
            Total Score: {score}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {levels.map((level, index) => {
            const isLocked = index > 0 && !completedLevels.includes(levels[index - 1].id);
            const progress = levelProgress[level.id] || 0;
            
            return (
              <div 
                key={level.id} 
                className={`relative border border-yellow-600/50 rounded-sm overflow-hidden flex flex-col bg-white dark:bg-[#5c4a3d] shadow-xl transition-transform duration-300 ${isLocked ? 'opacity-80 grayscale-[50%]' : 'hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]'}`}
              >
                {/* Image Header */}
                <div className="relative h-48 w-full">
                  <img 
                    src={level.image} 
                    alt={level.title} 
                    className="w-full h-full object-cover opacity-80 dark:opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#5c4a3d] to-transparent" />
                  
                  <div className="absolute bottom-4 left-4">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white drop-shadow-lg">{level.title}</h2>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{level.subtitle}</p>
                  </div>

                  {isLocked && (
                    <div className="absolute top-4 right-4 text-pink-600 dark:text-pink-500">
                      <Lock className="w-8 h-8" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-pink-600 dark:text-pink-400 font-medium mb-6">{level.description}</p>
                  
                  <div className="space-y-3 font-mono text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-yellow-600 dark:text-yellow-400">Monster:</span>
                      <span className="text-cyan-600 dark:text-cyan-400">{level.monster}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-600 dark:text-yellow-400">HP:</span>
                      <span className="text-yellow-600 dark:text-yellow-400">{level.hp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-600 dark:text-yellow-400">Progress:</span>
                      <span className="text-yellow-600 dark:text-yellow-400">{progress}/5</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-yellow-600/30 text-center">
                    {isLocked ? (
                      <span className="text-pink-600 dark:text-pink-500 text-sm font-mono">Complete previous level to unlock</span>
                    ) : (
                      <Link 
                        to={`/battle/${level.id}`}
                        className="inline-block w-full py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded transition-colors"
                      >
                        {progress > 0 ? 'Continue Battle' : 'Enter Battle'}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
