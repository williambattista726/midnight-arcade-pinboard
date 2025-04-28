
import React from "react";
import GameIcon from "./GameIcon";
import { useGameContext } from "@/context/GameContext";

const GameGrid: React.FC = () => {
  const { filteredGames } = useGameContext();
  
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 p-4">
      {filteredGames.map((game, index) => (
        <GameIcon key={game.id} game={game} index={index} />
      ))}
      
      {filteredGames.length === 0 && (
        <div className="col-span-full text-center py-10">
          <p className="text-white/70 text-lg">No games match your search</p>
        </div>
      )}
    </div>
  );
};

export default GameGrid;
