
import React from "react";
import GameIcon from "./GameIcon";
import { useGameContext } from "@/context/GameContext";

const GameGrid: React.FC = () => {
  const { filteredGames, isLoading } = useGameContext();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
          <p className="text-white/70 text-lg">Loading games...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 p-4" id="game-buttons-container">
      {filteredGames.map((game, index) => (
        <GameIcon key={game.id} game={game} index={index} />
      ))}
      
      {filteredGames.length === 0 && (
        <div className="col-span-full text-center py-10" id="noResults">
          <p className="text-white/70 text-lg">No games match your search</p>
        </div>
      )}
    </div>
  );
};

export default GameGrid;
