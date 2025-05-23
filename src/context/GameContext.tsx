import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Game } from "../data/games";
import { toast } from "@/components/ui/use-toast";
import { loadGameList, formatGameName, GameData, defaultGameSources, getRandomColor } from "@/utils/gameLoader";
import { gameConfig, defaultGames as configDefaultGames } from "@/config/gameConfig";

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
  isLoading: boolean;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

// Keys for localStorage
const STORAGE_KEYS = {
  PINNED_GAMES: 'pinnedGames',
  FAVORITE_GAMES: 'favoriteGames',
  GAME_COLORS: 'gameColors',
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [pinnedGames, setPinnedGames] = useState<Game[]>([]);
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeView, setActiveView] = useState<"all" | "favorites">("all");
  const [orderedGames, setOrderedGames] = useState<Game[]>([...configDefaultGames]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [gameColors, setGameColors] = useState<Record<string, string>>({});

  // Load pinned and favorite games from localStorage
  useEffect(() => {
    const savedPinnedGames = localStorage.getItem(STORAGE_KEYS.PINNED_GAMES);
    const savedFavoriteGames = localStorage.getItem(STORAGE_KEYS.FAVORITE_GAMES);
    const savedGameColors = localStorage.getItem(STORAGE_KEYS.GAME_COLORS);
    
    if (savedPinnedGames) {
      try {
        setPinnedGames(JSON.parse(savedPinnedGames));
      } catch (error) {
        console.error('Error parsing pinned games from localStorage', error);
      }
    }
    
    if (savedFavoriteGames) {
      try {
        setFavoriteGames(JSON.parse(savedFavoriteGames));
      } catch (error) {
        console.error('Error parsing favorite games from localStorage', error);
      }
    }
    
    if (savedGameColors) {
      try {
        setGameColors(JSON.parse(savedGameColors));
      } catch (error) {
        console.error('Error parsing game colors from localStorage', error);
      }
    }
  }, []);

  // Save pinned and favorite games to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PINNED_GAMES, JSON.stringify(pinnedGames));
  }, [pinnedGames]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITE_GAMES, JSON.stringify(favoriteGames));
  }, [favoriteGames]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GAME_COLORS, JSON.stringify(gameColors));
  }, [gameColors]);

  // Load games from text files using our configuration
  useEffect(() => {
    const loadGames = async () => {
      try {
        setIsLoading(true);
        
        // Use the game sources from the configuration
        const gameDataList = await Promise.all(
          defaultGameSources.map(source => 
            loadGameList({ file: source.file, directory: source.directory })
          )
        );
        
        const newGames = gameDataList.flatMap((gameData: GameData) => 
          gameData.folders.map((folder, index) => {
            const title = formatGameName(folder);
            const gameId = `${gameData.directory}-${index}`;
            
            // Use stored color if available, otherwise generate a new one
            const storedColor = gameColors[gameId];
            const color = storedColor || getRandomColor();
            
            // Store the color if it's new
            if (!storedColor) {
              setGameColors(prev => ({
                ...prev,
                [gameId]: color
              }));
            }
            
            return {
              id: gameId,
              title,
              icon: gameConfig.defaultIcon, // Use the default icon from config
              color,
              url: `${gameData.directory}${folder}`
            };
          })
        );
        
        setOrderedGames(newGames);
        
        // Show toast notification if there are games
        if (newGames.length > 0) {
          toast({
            title: "Games Loaded",
            description: `Successfully loaded ${newGames.length} games`,
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Error loading games:", error);
        toast({
          title: "Error Loading Games",
          description: "Failed to load game list. Using default games instead.",
          variant: "destructive",
          duration: 5000,
        });
        // Use default games from config as fallback
        setOrderedGames([...configDefaultGames]);
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
  }, []);

  // Helper function to get a random color for game icons
  const getRandomColor = (): string => {
    const colors = [
      "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", 
      "bg-yellow-500", "bg-red-500", "bg-indigo-500", "bg-cyan-500", 
      "bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-rose-500"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

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
      
      if (gameConfig.showPinNotifications) {
        toast({
          title: "Game unpinned",
          description: `${game.title} has been removed from your taskbar.`,
          duration: 3000,
        });
      }
    } else {
      setPinnedGames([...pinnedGames, game]);
      
      if (gameConfig.showPinNotifications) {
        toast({
          title: "Game pinned",
          description: `${game.title} has been added to your taskbar.`,
          duration: 3000,
        });
      }
    }
  };

  const toggleFavoriteGame = (game: Game) => {
    const isCurrentlyFavorite = favoriteGames.some((g) => g.id === game.id);
    
    if (isCurrentlyFavorite) {
      setFavoriteGames(favoriteGames.filter((g) => g.id !== game.id));
      
      if (gameConfig.showFavoriteNotifications) {
        toast({
          title: "Removed from favorites",
          description: `${game.title} has been removed from your favorites.`,
          duration: 3000,
        });
      }
    } else {
      setFavoriteGames([...favoriteGames, game]);
      
      if (gameConfig.showFavoriteNotifications) {
        toast({
          title: "Added to favorites",
          description: `${game.title} has been added to your favorites.`,
          duration: 3000,
        });
      }
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
        reorderGames,
        isLoading
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
