import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Code, Info, ChevronRight } from 'lucide-react';
import { libraryData } from '../data/libraryData';

export default function LibraryPage() {
  const [selectedTopic, setSelectedTopic] = useState(libraryData[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <h2 className="text-xl font-black mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
            <Book className="text-yellow-500" /> Library
          </h2>
          <div className="space-y-2">
            {libraryData.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left font-bold transition-all ${
                  selectedTopic.id === topic.id
                    ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20'
                    : 'bg-white dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {topic.title}
                <ChevronRight className={`w-4 h-4 ${selectedTopic.id === topic.id ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-8">
          <motion.div
            key={selectedTopic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#2a2a2a] p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl"
          >
            <h1 className="text-4xl font-black mb-4 text-gray-900 dark:text-white uppercase tracking-tight">
              {selectedTopic.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {selectedTopic.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basics */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                  <Info className="w-5 h-5" /> Key Concepts
                </h3>
                <ul className="space-y-3">
                  {selectedTopic.basics.map((point, index) => (
                    <li key={index} className="flex gap-3 text-gray-600 dark:text-gray-300">
                      <span className="text-yellow-500 font-bold">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Syntax */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                  <Code className="w-5 h-5" /> Syntax Reference
                </h3>
                <div className="space-y-4">
                  {Object.entries(selectedTopic.syntax).map(([lang, code]) => (
                    <div key={lang} className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1a1a]">
                      <div className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-[10px] font-black uppercase text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                        {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </div>
                      <pre className="p-4 text-sm font-mono text-gray-800 dark:text-gray-200 overflow-x-auto">
                        <code>{code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
