
import React from "react";
import { games } from "@/data/games";
import GameIcon from "./GameIcon";

const GameGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 p-4">
      {games.map((game) => (
        <GameIcon key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameGrid;
