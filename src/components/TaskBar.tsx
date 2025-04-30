
import React, { useState } from "react";
import { useGameContext } from "@/context/GameContext";
import GameIcon from "./GameIcon";

const TaskBar: React.FC = () => {
  const { pinnedGames, togglePinGame } = useGameContext();
  const [isDragOver, setIsDragOver] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDragOver) setIsDragOver(true);
  };
  
  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    try {
      const gameData = JSON.parse(e.dataTransfer.getData('application/json'));
      if (gameData && gameData.id) {
        togglePinGame(gameData);
      }
    } catch (err) {
      console.error("Invalid drop data", err);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 glass-morphism flex items-center justify-center gap-2 px-6">
      <div 
        className={`flex items-center gap-2 overflow-x-auto pb-1 px-4 min-h-12 rounded-lg transition-colors ${isDragOver ? 'bg-blue-500/30 border border-dashed border-blue-500' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {pinnedGames.length > 0 ? (
          pinnedGames.map((game) => (
            <GameIcon key={game.id} game={game} size="sm" />
          ))
        ) : (
          <p className="text-white/70 text-sm italic">
            {isDragOver ? "Drop game here to pin" : "Right-click games to pin them here or drag games here"}
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskBar;
