
export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  iframeUrl: string;
  category: GameCategory;
  tags: string[];
}

export enum GameCategory {
  ALL = 'All',
  ACTION = 'Action',
  PUZZLE = 'Puzzle',
  SPORTS = 'Sports',
  DRIVING = 'Driving',
  ARCADE = 'Arcade',
  CASUAL = 'Casual'
}
