import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sword, Shield, Zap, Trophy, Play } from 'lucide-react';

export default function LandingPage() {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["Solve Problems ⚔️", "Defeat Monsters 👾", "Level Up 🚀"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
          src="/background-video.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/90 dark:from-black/80 dark:via-black/60 dark:to-black/90" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
            Master DSA by Fighting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Monsters
            </span> in an Epic Arena!
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Turn coding problems into battles and level up your skills.
          </p>

          <div className="h-12 mb-12">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl md:text-3xl font-bold text-indigo-400"
            >
              {texts[textIndex]}
            </motion.p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/auth"
              className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:shadow-[0_0_50px_rgba(79,70,229,0.8)] transition-all duration-300"
            >
              <Play className="w-6 h-6 mr-2" />
              Start Your Journey
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sword, title: "Gamified Learning", desc: "Fight monsters with code" },
              { icon: Shield, title: "Skill Progression", desc: "Unlock new levels & abilities" },
              { icon: Zap, title: "Real Coding Experience", desc: "Built-in Monaco Editor" },
              { icon: Trophy, title: "Track Your Growth", desc: "Detailed stats & history" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="p-6 rounded-2xl bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/20 hover:border-indigo-500/50 transition-all shadow-xl"
              >
                <feature.icon className="w-12 h-12 text-indigo-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Avatar vs Monster Preview */}
      <div className="relative z-10 py-20 bg-gray-900 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 relative">
          <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full" />
          <div className="flex justify-between items-center relative z-10">
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <div className="w-32 h-32 md:w-48 md:h-48 bg-indigo-600/20 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.8)] overflow-hidden border-4 border-indigo-500">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Warrior&backgroundColor=transparent" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <span className="mt-4 text-xl font-bold text-white">You</span>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-4xl md:text-6xl font-black text-red-500 italic drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]"
            >
              VS
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.05, 1], filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <div className="w-32 h-32 md:w-48 md:h-48 bg-red-900/20 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.8)] overflow-hidden border-4 border-red-500">
                <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Monster&backgroundColor=transparent" alt="Monster" className="w-full h-full object-cover scale-110" />
              </div>
              <span className="mt-4 text-xl font-bold text-white">Monster</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="relative z-10 py-12 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around items-center text-center gap-6">
          {[
            { value: "10+", label: "Challenges" },
            { value: "5", label: "Skill Levels" },
            { value: "∞", label: "Endless Practice" },
            { value: "100%", label: "Real Coding Battles" }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-4xl font-extrabold text-white mb-1">{stat.value}</span>
              <span className="text-indigo-200 font-medium uppercase tracking-wider text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
