
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Game, games } from "../data/games";
import { toast } from "@/components/ui/use-toast";

interface GameContextProps {
  pinnedGames: Game[];
  togglePinGame: (game: Game) => void;
  isPinned: (gameId: string) => boolean;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [pinnedGames, setPinnedGames] = useState<Game[]>([]);

  const togglePinGame = (game: Game) => {
    const isCurrentlyPinned = pinnedGames.some((g) => g.id === game.id);
    
    if (isCurrentlyPinned) {
      setPinnedGames(pinnedGames.filter((g) => g.id !== game.id));
      toast({
        title: "Game unpinned",
        description: `${game.title} has been removed from your taskbar.`,
        duration: 3000,
      });
    } else {
      setPinnedGames([...pinnedGames, game]);
      toast({
        title: "Game pinned",
        description: `${game.title} has been added to your taskbar.`,
        duration: 3000,
      });
    }
  };

  const isPinned = (gameId: string) => {
    return pinnedGames.some((game) => game.id === gameId);
  };

  return (
    <GameContext.Provider value={{ pinnedGames, togglePinGame, isPinned }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
