
import React from "react";
import GameIcon from "./GameIcon";
import { useGameContext } from "@/context/GameContext";

const GameGrid: React.FC = () => {
  const { filteredGames, reorderGames } = useGameContext();
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    const startIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    
    // Calculate the drop target index
    const grid = e.currentTarget;
    const gridRect = grid.getBoundingClientRect();
    const itemWidth = gridRect.width / 8; // assuming 8 items per row for large screens
    const itemHeight = 110; // approximate height of an item with its label
    
    const relX = e.clientX - gridRect.left;
    const relY = e.clientY - gridRect.top;
    
    const col = Math.floor(relX / itemWidth);
    const row = Math.floor(relY / itemHeight);
    
    const itemsPerRow = Math.floor(gridRect.width / itemWidth);
    const targetIndex = row * itemsPerRow + col;
    
    // Ensure the target index is valid
    const endIndex = Math.min(Math.max(0, targetIndex), filteredGames.length - 1);
    
    if (startIndex !== endIndex) {
      reorderGames(startIndex, endIndex);
    }
  };

  return (
    <div 
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 p-4"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
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
