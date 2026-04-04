import React from 'react';
import { useStore } from '../store/useStore';
import { Trophy, Medal, Star } from 'lucide-react';

// Mock data for leaderboard
const mockLeaderboard = [
  { rank: 1, name: "AlgoMaster99", score: 5400, avatar: "Felix" },
  { rank: 2, name: "CodeNinja", score: 4800, avatar: "Aneka" },
  { rank: 3, name: "ByteWarrior", score: 4200, avatar: "Jack" },
  { rank: 4, name: "SyntaxSorcerer", score: 3900, avatar: "Molly" },
  { rank: 5, name: "LogicLord", score: 3500, avatar: "Oliver" },
];

export default function LeaderboardPage() {
  const { user, score } = useStore();

  // Insert current user into mock leaderboard if they have a score
  const displayLeaderboard = [...mockLeaderboard];
  if (user && score > 0) {
    displayLeaderboard.push({ rank: '-', name: user.name, score: score, avatar: "Hero", isCurrentUser: true });
    displayLeaderboard.sort((a, b) => b.score - a.score);
    // Re-rank
    displayLeaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white p-8 font-sans transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Trophy className="w-16 h-16 text-yellow-500 dark:text-yellow-400 mx-auto mb-4" />
          <h1 className="text-5xl font-black text-yellow-500 dark:text-yellow-400 tracking-tight drop-shadow-md">
            Hall of Fame
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">The greatest warriors of AlgoQuest</p>
        </div>

        <div className="bg-white dark:bg-[#2a2a2a] rounded-xl border border-yellow-600/30 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 dark:bg-[#1a1a1a] border-b border-yellow-600/30 font-bold text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
            <div className="col-span-2 text-center">Rank</div>
            <div className="col-span-7">Hero</div>
            <div className="col-span-3 text-right pr-4">Score</div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {displayLeaderboard.map((player) => (
              <div 
                key={player.name} 
                className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors ${player.isCurrentUser ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500' : 'hover:bg-gray-50 dark:hover:bg-[#333]'}`}
              >
                <div className="col-span-2 flex justify-center">
                  {player.rank === 1 ? <Medal className="w-8 h-8 text-yellow-500 dark:text-yellow-400" /> :
                   player.rank === 2 ? <Medal className="w-8 h-8 text-gray-400" /> :
                   player.rank === 3 ? <Medal className="w-8 h-8 text-amber-600" /> :
                   <span className="text-xl font-bold text-gray-500">#{player.rank}</span>}
                </div>
                
                <div className="col-span-7 flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.avatar}&backgroundColor=transparent`} alt={player.name} />
                  </div>
                  <span className={`font-bold text-lg ${player.isCurrentUser ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-800 dark:text-gray-200'}`}>
                    {player.name}
                    {player.isCurrentUser && <span className="ml-2 text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">You</span>}
                  </span>
                </div>
                
                <div className="col-span-3 text-right pr-4 flex items-center justify-end gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-mono text-xl text-yellow-600 dark:text-yellow-400">{player.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
