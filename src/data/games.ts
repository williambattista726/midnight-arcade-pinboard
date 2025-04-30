
export interface Game {
  id: string;
  title: string;
  icon?: string;
  image?: string;
  color: string;
  url?: string;
}

// Example games moved to gameConfig.ts as defaultGames
export { defaultGames as games } from '@/config/gameConfig';
