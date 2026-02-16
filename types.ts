
// Fix: Added exports to make this file a valid module and provide types for .tsx components.
// Note: This file is deprecated for runtime use in favor of types.js.

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  iframeUrl: string;
  category: string;
  tags: string[];
}

export const GameCategory = {
  ALL: 'All',
  ACTION: 'Action',
  PUZZLE: 'Puzzle',
  SPORTS: 'Sports',
  DRIVING: 'Driving',
  ARCADE: 'Arcade',
  CASUAL: 'Casual'
} as const;
