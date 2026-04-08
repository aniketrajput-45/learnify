import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DataVisualizer({ type, data, activeIndex = -1, compareIndex = -1 }) {
  const visualData = typeof data === 'string' ? data.split('') : data;
  
  if (!visualData || !Array.isArray(visualData)) return null;

  const renderArray = () => (
    <div className="flex flex-wrap gap-2 items-end justify-center min-h-[120px] p-4 bg-gray-50/50 dark:bg-black/20 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
      <AnimatePresence mode="popLayout">
        {visualData.map((item, idx) => {
          const isActive = idx === activeIndex;
          const isComparing = idx === compareIndex;
          
          return (
            <motion.div
              key={`${idx}-${item}`}
              layout
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                backgroundColor: isActive ? '#eab308' : isComparing ? '#06b6d4' : 'transparent',
                borderColor: isActive ? '#ca8a04' : isComparing ? '#0891b2' : 'currentColor',
                color: (isActive || isComparing) ? '#000000' : 'inherit'
              }}
              exit={{ opacity: 0, scale: 0.5, y: -20 }}
              className={`
                relative flex flex-col items-center justify-center w-12 h-12 
                border-2 rounded-lg font-bold shadow-sm transition-colors
                ${isActive ? 'z-20' : 'z-10'}
                bg-white dark:bg-[#2a2a2a] text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700
              `}
            >
              <span className="text-lg">{item}</span>
              <span className="absolute -bottom-6 text-[10px] text-gray-400 font-mono">
                [{idx}]
              </span>
              {(isActive || isComparing) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`absolute -top-8 text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-yellow-500 text-black' : 'bg-cyan-500 text-white'
                  }`}
                >
                  {isActive ? 'Pointer' : 'Target'}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );

  const renderLinkedList = () => (
    <div className="flex flex-wrap gap-8 items-center justify-center min-h-[120px] p-4 bg-gray-50/50 dark:bg-black/20 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
      <AnimatePresence mode="popLayout">
        {visualData.map((item, idx) => {
          const isActive = idx === activeIndex;
          
          return (
            <React.Fragment key={`${idx}-${item}`}>
              <motion.div
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isActive ? '#eab308' : '#ffffff',
                  borderColor: isActive ? '#ca8a04' : '#e5e7eb',
                  color: isActive ? '#000000' : 'inherit'
                }}
                className="relative flex items-center justify-center w-16 h-12 border-2 rounded shadow-md dark:bg-[#2a2a2a] dark:text-white dark:border-gray-700 font-bold"
              >
                {item}
                {idx === 0 && <span className="absolute -top-6 text-[10px] text-yellow-600 font-black">HEAD</span>}
                {isActive && (
                  <motion.div 
                    layoutId="curr"
                    className="absolute -bottom-8 bg-yellow-500 text-black text-[9px] font-black px-2 py-0.5 rounded shadow-lg"
                  >
                    CURRENT
                  </motion.div>
                )}
              </motion.div>
              {idx < visualData.length - 1 && (
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  className="h-0.5 bg-gray-300 dark:bg-gray-600 relative"
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-gray-300 dark:border-gray-600 rotate-45" />
                </motion.div>
              )}
              {idx === visualData.length - 1 && (
                <div className="flex items-center gap-2">
                   <div className="h-0.5 w-8 bg-gray-300 dark:bg-gray-600" />
                   <span className="text-[10px] font-bold text-gray-400">NULL</span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
          Live Visualizer: {type}
        </h3>
        <span className="text-[10px] text-gray-400 font-medium italic">Updates as you progress</span>
      </div>
      {type === 'array' || type === 'string' ? renderArray() : renderLinkedList()}
    </div>
  );
}
