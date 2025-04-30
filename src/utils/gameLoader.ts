
// Utility to load game lists from text files
import { gameConfig } from "@/config/gameConfig";

export interface GameLoadOptions {
  file: string;
  directory: string;
}

export interface GameData {
  folders: string[];
  directory: string;
}

export async function loadGameList({ file, directory }: GameLoadOptions): Promise<GameData> {
  try {
    const response = await fetch(file);
    
    if (!response.ok) {
      throw new Error(`Failed to load ${file}`);
    }
    
    const text = await response.text();
    const folders = text.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (folders.length === 0) {
      throw new Error(`No games found in ${file}`);
    }

    return { folders, directory };
  } catch (error) {
    console.error(`Error loading game list from ${file}:`, error);
    throw error;
  }
}

export function formatGameName(folder: string): string {
  return folder.replace('./', '')
    .split('-').join(' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Instead of hardcoding game sources, we use the configuration file
export const defaultGameSources = gameConfig.sources;

// Get a random color from the configured palette
export function getRandomColor(): string {
  const colors = gameConfig.colorPalette;
  return colors[Math.floor(Math.random() * colors.length)];
}
