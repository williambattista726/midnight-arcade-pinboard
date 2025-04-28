
import React from "react";
import { useGameContext } from "@/context/GameContext";
import GameIcon from "./GameIcon";

const TaskBar: React.FC = () => {
  const { pinnedGames } = useGameContext();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 glass-morphism flex items-center justify-center gap-2 px-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 px-4">
        {pinnedGames.length > 0 ? (
          pinnedGames.map((game) => (
            <GameIcon key={game.id} game={game} size="sm" />
          ))
        ) : (
          <p className="text-white/70 text-sm italic">Right-click games to pin them here</p>
        )}
      </div>
    </div>
  );
};

export default TaskBar;
