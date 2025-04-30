
/**
 * Game Configuration File
 * 
 * This file allows developers to easily configure the game sources, paths, 
 * default settings, and other parameters for the game system.
 */

import { Game } from "@/data/games";

export interface GameSource {
  /** Path to the text file containing game folder names */
  file: string;
  
  /** Base directory where the game folders are located */
  directory: string;
  
  /** Optional name for this game source */
  name?: string;
}

export interface GameConfigOptions {
  /** List of game sources to load games from */
  sources: GameSource[];
  
  /** Default icon to use when a game doesn't have a specific icon */
  defaultIcon: string;
  
  /** Default color palette to use for game backgrounds */
  colorPalette: string[];
  
  /** Whether to show toasts when pinning/unpinning games */
  showPinNotifications: boolean;
  
  /** Whether to show toasts when adding/removing favorites */
  showFavoriteNotifications: boolean;
}

/**
 * Game Configuration
 * 
 * Modify this object to change the game system behavior
 */
export const gameConfig: GameConfigOptions = {
  // Sources to load games from
  sources: [
    { 
      file: '/htmlgames.txt', 
      directory: '/htmlgames/',
      name: 'HTML Games' 
    },
    { 
      file: '/htmlgames1.txt', 
      directory: '/htmlgames1/html5/',
      name: 'Advanced HTML5 Games'  
    }
    // Add more sources as needed
  ],
  
  // Default icon for games (from Lucide icons)
  defaultIcon: "gamepad",
  
  // Color palette for game backgrounds
  colorPalette: [
    "bg-blue-500", 
    "bg-green-500", 
    "bg-purple-500", 
    "bg-pink-500", 
    "bg-yellow-500", 
    "bg-red-500", 
    "bg-indigo-500", 
    "bg-cyan-500", 
    "bg-emerald-500", 
    "bg-violet-500", 
    "bg-amber-500", 
    "bg-rose-500"
  ],
  
  // Notification settings
  showPinNotifications: true,
  showFavoriteNotifications: true
};

/**
 * Predefined default games for when no games can be loaded from sources
 */
export const defaultGames: Game[] = [
  {
    id: "game1",
    title: "Arcade Classics",
    icon: "gamepad",
    color: "bg-red-500",
  },
  {
    id: "game2",
    title: "RPG Adventures",
    icon: "gamepad",
    color: "bg-blue-500",
  },
  // You can add more default games here
];

export default gameConfig;
