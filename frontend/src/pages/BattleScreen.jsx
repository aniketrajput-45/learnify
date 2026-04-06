import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { levels } from '../data/levels';
import { validateAnswer } from '../utils/validation';
import { useStore } from '../store/useStore';
import { Play, ArrowLeft, BookOpen, X, Heart, Sparkles } from 'lucide-react';
import { getSenseiHint } from '../utils/gemini';

export default function BattleScreen() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { levelProgress, updateProgress, completeLevel } = useStore();
  
  const level = levels.find(l => l.id === parseInt(levelId));
  
  const [currentIndex, setCurrentIndex] = useState(levelProgress[level?.id] || 0);
  const question = level?.questions[currentIndex];

  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  
  // Sensei AI State
  const [senseiHint, setSenseiHint] = useState(null);
  const [isSenseiLoading, setIsSenseiLoading] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState([]); // [{ id, text, x, y, color }]
  const [activeEffect, setActiveEffect] = useState(null); // 'slash', 'impact', etc.

  const triggerFloatingText = (text, type = 'damage') => {
    const id = Math.random();
    const color = type === 'damage' ? 'text-red-500' : type === 'heal' ? 'text-green-500' : 'text-yellow-500';
    const xOffset = Math.random() * 40 - 20; // Random jitter
    
    setFloatingTexts(prev => [...prev, { id, text, x: xOffset, color }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== id));
    }, 1500);
  };
  
  // Game State
  const maxHp = level?.hp || 500;
  const damagePerHit = maxHp / 5;
  const [monsterHp, setMonsterHp] = useState(maxHp - (currentIndex * damagePerHit));
  
  // Player State
  const maxPlayerHp = 100;
  const [playerHp, setPlayerHp] = useState(maxPlayerHp);
  
  const [actionState, setActionState] = useState('idle'); // idle, attacking, hurt, victory, defeat
  const [showTutorial, setShowTutorial] = useState(currentIndex === 0);

  useEffect(() => {
    if (!level) navigate('/levels');
    if (currentIndex >= 5) {
      handleLevelComplete();
    } else {
      setCode(question?.templates[language] || '');
      setOutput(null);
    }
  }, [language, currentIndex, level, navigate]);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      const result = validateAnswer(code, language, question.testCases);
      setOutput(result);
      setIsRunning(false);

      if (result.success) {
        setActionState('attacking');
        setActiveEffect('slash');
        triggerFloatingText(`-${Math.round(damagePerHit)} HP`, 'damage');
        
        setTimeout(() => setActiveEffect(null), 600);
        
        setTimeout(() => {
          setMonsterHp(prev => {
            const newHp = Math.max(0, prev - damagePerHit);
            
            if (currentIndex + 1 >= 5 || newHp <= 0) {
              handleLevelComplete();
            } else {
              setCurrentIndex(c => c + 1);
              updateProgress(level.id, currentIndex + 1);
            }
            
            return newHp;
          });
          setActionState('idle');
        }, 800);
      } else {
        setActionState('hurt');
        triggerFloatingText(`-20 HP`, 'damage');
        setTimeout(() => {
          setPlayerHp(prev => {
            const newPlayerHp = Math.max(0, prev - 20);
            if (newPlayerHp <= 0) {
              setActionState('defeat');
            } else {
              setActionState('idle');
            }
            return newPlayerHp;
          });
        }, 500);
      }
    }, 800);
  };

  const handleLevelComplete = () => {
    setActionState('victory');
    completeLevel(level.id);
    
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#eab308', '#ec4899', '#06b6d4']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#eab308', '#ec4899', '#06b6d4']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      navigate('/levels');
    }, 4000);
  };

  const handleRestart = () => {
    setPlayerHp(maxPlayerHp);
    setActionState('idle');
    setOutput(null);
    setSenseiHint(null);
  };

  const handleAskSensei = async () => {
    if (isSenseiLoading) return;
    setIsSenseiLoading(true);
    const hint = await getSenseiHint(question, code, output?.logs || []);
    setSenseiHint(hint);
    setIsSenseiLoading(false);
  };

  if (!level || !question) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white font-sans transition-colors">
      
      {/* Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-[#2a2a2a] border border-yellow-500/30 p-8 rounded-xl max-w-lg w-full relative"
            >
              <button onClick={() => setShowTutorial(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-4 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" /> Level Tutorial
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{level.tutorial}</p>
              <div className="flex justify-end gap-4">
                <button 
                  onClick={() => setShowTutorial(false)}
                  className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded font-medium transition-colors text-gray-800 dark:text-white"
                >
                  Skip
                </button>
                <button 
                  onClick={() => setShowTutorial(false)}
                  className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded font-bold transition-colors"
                >
                  Start Battle
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Defeat Modal */}
      <AnimatePresence>
        {actionState === 'defeat' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-red-900/20 border border-red-500/50 p-8 rounded-xl max-w-md w-full text-center"
            >
              <h2 className="text-4xl font-black text-red-500 mb-4">DEFEATED</h2>
              <p className="text-gray-300 mb-8">Your HP has reached 0. The monster was too strong this time.</p>
              <button 
                onClick={handleRestart}
                className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded font-bold transition-colors w-full"
              >
                Try Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP: Arena (40%) */}
      <div className="relative h-[40%] border-b border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-100 dark:bg-transparent">
        <img src={level.image} alt="Arena" className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-[#1a1a1a]" />
        
        <div className="absolute top-4 left-4 z-20 flex gap-4">
          <button 
            onClick={() => navigate('/levels')}
            className="p-2 bg-white/80 dark:bg-black/50 rounded hover:bg-gray-100 dark:hover:bg-black/80 transition-colors border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowTutorial(true)}
            className="p-2 bg-white/80 dark:bg-black/50 rounded hover:bg-gray-100 dark:hover:bg-black/80 transition-colors border border-gray-300 dark:border-gray-700 text-yellow-600 dark:text-yellow-400 flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" /> <span className="text-sm font-bold">Tutorial</span>
          </button>
        </div>

        <div className="absolute top-4 right-4 z-20 bg-white/80 dark:bg-black/50 px-4 py-2 rounded border border-gray-300 dark:border-gray-700 font-mono text-yellow-600 dark:text-yellow-400 font-bold">
          Question {currentIndex + 1} / 5
        </div>

        {/* Floating Combat Text Layer */}
        <div className="absolute inset-0 pointer-events-none z-30">
          <AnimatePresence>
            {floatingTexts.map(t => (
              <motion.div
                key={t.id}
                initial={{ opacity: 1, y: 150, x: t.x + (t.text.includes('Hero') ? 100 : 400) }}
                animate={{ opacity: 0, y: 50 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={`absolute text-2xl font-black ${t.color} drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}
              >
                {t.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Slash Visual Effect */}
        <AnimatePresence>
          {activeEffect === 'slash' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -45, x: 400, y: 150 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 1.2], x: 400, y: 150 }}
              exit={{ opacity: 0 }}
              className="absolute z-40 pointer-events-none"
            >
              <div className="relative w-64 h-2 bg-white blur-sm rounded-full shadow-[0_0_20px_#fff]" />
              <div className="absolute top-0 left-0 w-64 h-1 bg-cyan-400 blur-[2px] rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 h-full flex justify-between items-end px-16 pb-8 max-w-6xl mx-auto">
          {/* Avatar */}
          <div className="flex flex-col items-center w-64">
            <div className="w-full bg-gray-300 dark:bg-gray-900 rounded h-3 mb-2 border border-gray-400 dark:border-gray-700 overflow-hidden relative">
              <motion.div 
                className="bg-green-500 h-full"
                initial={{ width: '100%' }}
                animate={{ width: `${(playerHp / maxPlayerHp) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="font-mono text-sm text-green-600 dark:text-green-400 mb-4 flex items-center gap-1">
              <Heart className="w-4 h-4 fill-current" /> Hero ({playerHp}/{maxPlayerHp})
            </span>

            <motion.div
              animate={
                actionState === 'attacking' ? { 
                  x: [0, 250, 0], 
                  skewX: [0, -20, 0],
                  scale: [1, 1.2, 1],
                } :
                actionState === 'hurt' ? { 
                  x: [0, -20, 10, -5, 0], 
                  y: [0, -20, 0],
                  rotate: [0, -10, 5, 0],
                  filter: ['brightness(1)', 'brightness(0.5) sepia(1) saturate(5) hue-rotate(-50deg)', 'brightness(1)'] 
                } :
                actionState === 'defeat' ? { rotate: 90, y: 100, opacity: 0, scale: 0.5 } :
                { 
                  y: [0, -8, 0],
                  scale: [1, 1.02, 1],
                  rotate: [-1, 1, -1]
                }
              }
              transition={
                actionState === 'idle' ? { repeat: Infinity, duration: 3, ease: "easeInOut" } : 
                actionState === 'attacking' ? { duration: 0.6, ease: "backIn" } :
                { duration: 0.5 }
              }
              className="relative z-20"
            >
              <div className="w-32 h-32 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.4)] overflow-hidden border-4 border-indigo-500 relative">
                <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Hero&backgroundColor=transparent" alt="Avatar" className="w-full h-full object-cover scale-150" />
                {actionState === 'hurt' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.8, 0] }}
                    className="absolute inset-0 bg-red-600"
                  />
                )}
              </div>
              
              {/* Ground Shadow */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.1, 0.2] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/40 blur-md rounded-[100%]"
              />

              {actionState === 'attacking' && (
                <motion.div 
                  initial={{ opacity: 1, scale: 0.5, x: 50 }}
                  animate={{ opacity: 0, scale: 4, x: 400 }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-1/2 left-full w-20 h-20 bg-cyan-400 rounded-full blur-xl -mt-10"
                />
              )}
            </motion.div>
          </div>

          {/* Monster */}
          <div className="flex flex-col items-center w-64">
            <div className="w-full bg-gray-300 dark:bg-gray-900 rounded h-3 mb-2 border border-gray-400 dark:border-gray-700 overflow-hidden relative">
              <motion.div 
                className="bg-red-500 h-full"
                initial={{ width: '100%' }}
                animate={{ width: `${(monsterHp / maxHp) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="font-mono text-sm text-red-600 dark:text-red-400 mb-4 font-bold">{level.monster} ({Math.round(monsterHp)}/{maxHp})</span>
            
            <AnimatePresence>
              {actionState !== 'victory' && (
                <motion.div
                  exit={{ opacity: 0, scale: 0, rotate: 180 }}
                  animate={
                    actionState === 'attacking' ? { 
                      x: [0, -20, 20, -10, 10, 0], 
                      filter: ['brightness(1)', 'brightness(2) contrast(1.5)', 'brightness(1)'] 
                    } :
                    { 
                      scale: [1, 1.05, 1],
                      y: [0, 10, 0]
                    }
                  }
                  transition={
                    actionState === 'idle' ? { repeat: Infinity, duration: 4, ease: "easeInOut" } : 
                    { duration: 0.4 }
                  }
                  className="relative"
                >
                  <div className="w-40 h-40 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.3)] overflow-hidden border-2 border-red-500/50 dark:border-red-900/50 relative">
                    <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${level.monster}&backgroundColor=transparent`} alt="Monster" className="w-full h-full object-cover scale-110" />
                    {actionState === 'attacking' && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.6, 0] }}
                        className="absolute inset-0 bg-white"
                      />
                    )}
                  </div>

                  {/* Ground Shadow */}
                  <motion.div 
                    animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.4, 0.3] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-black/50 blur-lg rounded-[100%]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {actionState === 'victory' && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-black text-yellow-500 dark:text-yellow-400 drop-shadow-lg mt-10"
              >
                LEVEL CLEARED!
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM: Code & Problem (60%) */}
      <div className="flex h-[60%] bg-white dark:bg-[#1a1a1a]">
        {/* LEFT: Problem Description */}
        <div className="w-[40%] p-6 overflow-y-auto border-r border-gray-200 dark:border-gray-800 custom-scrollbar">
          <h2 className="text-2xl font-bold mb-2 text-cyan-600 dark:text-cyan-400">{question.title}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{question.description}</p>
          
          <div className="bg-gray-50 dark:bg-[#2a2a2a] p-4 rounded mb-6 font-mono text-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-gray-500 mb-2 uppercase text-xs font-bold tracking-wider">Examples</h3>
            <pre className="whitespace-pre-wrap text-pink-600 dark:text-pink-400">{question.examples}</pre>
          </div>

          {/* Output Logs */}
          <div className="bg-gray-100 dark:bg-black p-4 rounded min-h-[150px] border border-gray-200 dark:border-gray-800">
            <h3 className="text-gray-500 mb-2 uppercase text-xs font-bold tracking-wider">Battle Logs</h3>
            <div className="space-y-2 font-mono text-sm">
              {!output && <span className="text-gray-500 dark:text-gray-600">Awaiting your spell...</span>}
              {output?.logs.map((log, i) => (
                <div key={i} className={log.includes('Passed') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Monaco Editor */}
        <div className="w-[60%] flex flex-col">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2a2a2a] border-b border-gray-200 dark:border-gray-800">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded px-4 py-2 outline-none focus:border-cyan-500 font-mono text-sm"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
            </select>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAskSensei}
              disabled={isSenseiLoading || actionState === 'victory'}
              className={`flex items-center px-4 py-2 rounded font-bold transition-all border ${
                isSenseiLoading ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 border-gray-300 dark:border-gray-700 cursor-wait' : 'bg-white dark:bg-[#1a1a1a] text-yellow-600 dark:text-yellow-400 border-yellow-500/50 hover:border-yellow-500 shadow-sm'
              }`}
            >
              <Sparkles className={`w-4 h-4 mr-2 ${isSenseiLoading ? 'animate-pulse' : ''}`} />
              {isSenseiLoading ? 'Consulting...' : 'Ask Sensei'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRun}
              disabled={isRunning || actionState !== 'idle' || actionState === 'victory'}
              className={`flex items-center px-8 py-2 rounded font-bold transition-all ${
                isRunning || actionState === 'victory' ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.5)]'
              }`}
            >
              {isRunning ? (
                <span className="animate-pulse">Casting...</span>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2 fill-current" /> Cast Spell
                </>
              )}
            </motion.button>
          </div>
        </div>
        
        <div className="flex-grow relative">
          <AnimatePresence>
            {senseiHint && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-4 left-4 right-4 z-30 bg-yellow-50 dark:bg-[#2a2620] border-2 border-yellow-500/50 p-4 rounded-lg shadow-2xl flex items-start gap-4"
              >
                <div className="bg-yellow-500 p-2 rounded-full text-black flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-yellow-800 dark:text-yellow-400 font-bold text-sm mb-1 uppercase tracking-wider">Sensei's Guidance</h4>
                  <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed italic">"{senseiHint}"</p>
                </div>
                <button 
                  onClick={() => setSenseiHint(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <Editor
              height="100%"
              language={language === 'c' || language === 'cpp' ? 'cpp' : language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                fontFamily: "'JetBrains Mono', monospace",
                padding: { top: 20 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                formatOnPaste: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
