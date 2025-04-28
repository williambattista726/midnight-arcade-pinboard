
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Game, games } from "../data/games";
import { toast } from "@/components/ui/use-toast";

interface GameContextProps {
  pinnedGames: Game[];
  favoriteGames: Game[];
  filteredGames: Game[];
  activeView: "all" | "favorites";
  togglePinGame: (game: Game) => void;
  toggleFavoriteGame: (game: Game) => void;
  isPinned: (gameId: string) => boolean;
  isFavorite: (gameId: string) => boolean;
  setSearchQuery: (query: string) => void;
  setActiveView: (view: "all" | "favorites") => void;
  reorderGames: (startIndex: number, endIndex: number) => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [pinnedGames, setPinnedGames] = useState<Game[]>([]);
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeView, setActiveView] = useState<"all" | "favorites">("all");
  const [orderedGames, setOrderedGames] = useState<Game[]>([...games]);

  // Filter games based on search query
  const filteredGames = React.useMemo(() => {
    const gamesForView = activeView === "all" ? orderedGames : favoriteGames;
    
    if (!searchQuery.trim()) {
      return gamesForView;
    }
    
    const query = searchQuery.toLowerCase();
    return gamesForView.filter(game => 
      game.title.toLowerCase().includes(query)
    );
  }, [searchQuery, activeView, orderedGames, favoriteGames]);

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

  const toggleFavoriteGame = (game: Game) => {
    const isCurrentlyFavorite = favoriteGames.some((g) => g.id === game.id);
    
    if (isCurrentlyFavorite) {
      setFavoriteGames(favoriteGames.filter((g) => g.id !== game.id));
      toast({
        title: "Removed from favorites",
        description: `${game.title} has been removed from your favorites.`,
        duration: 3000,
      });
    } else {
      setFavoriteGames([...favoriteGames, game]);
      toast({
        title: "Added to favorites",
        description: `${game.title} has been added to your favorites.`,
        duration: 3000,
      });
    }
  };

  const isPinned = (gameId: string) => {
    return pinnedGames.some((game) => game.id === gameId);
  };

  const isFavorite = (gameId: string) => {
    return favoriteGames.some((game) => game.id === gameId);
  };

  const reorderGames = (startIndex: number, endIndex: number) => {
    const updateOrdering = (games: Game[]) => {
      const result = Array.from(games);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

    if (activeView === "all") {
      setOrderedGames(updateOrdering(orderedGames));
    } else {
      setFavoriteGames(updateOrdering(favoriteGames));
    }

    toast({
      title: "Game moved",
      description: "The game has been repositioned.",
      duration: 2000,
    });
  };

  return (
    <GameContext.Provider 
      value={{ 
        pinnedGames, 
        favoriteGames,
        filteredGames,
        activeView,
        togglePinGame, 
        toggleFavoriteGame,
        isPinned,
        isFavorite, 
        setSearchQuery,
        setActiveView,
        reorderGames
      }}
    >
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
