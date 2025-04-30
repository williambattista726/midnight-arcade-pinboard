
// Utility to load game lists from text files
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

// Configuration for game sources - developers can modify this
export const defaultGameSources = [
  { file: '/htmlgames.txt', directory: '/htmlgames/' },
  { file: '/htmlgames1.txt', directory: '/htmlgames1/html5/' }
];
