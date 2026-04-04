import { create } from 'zustand';

export const useStore = create((set) => ({
  user: null,
  theme: 'dark',
  completedLevels: [], // Array of level IDs
  levelProgress: {}, // { levelId: currentQuestionIndex }
  score: 0,
  
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null, completedLevels: [], levelProgress: {}, score: 0 }),
  setTheme: (theme) => set({ theme }),
  
  updateProgress: (levelId, questionIndex) => set((state) => ({
    levelProgress: { ...state.levelProgress, [levelId]: questionIndex },
    score: state.score + 10
  })),
  
  completeLevel: (levelId) => set((state) => {
    if (!state.completedLevels.includes(levelId)) {
      return { 
        completedLevels: [...state.completedLevels, levelId],
        score: state.score + 100 // Bonus for completing level
      };
    }
    return state;
  }),
}));
