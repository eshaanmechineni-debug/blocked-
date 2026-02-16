
import { Game, GameCategory } from './types';

export const GAMES: Game[] = [
  {
    id: '1',
    title: 'Retro Racer 2D',
    description: 'An old-school top-down racing game with challenging tracks.',
    thumbnail: 'https://picsum.photos/seed/race/400/300',
    iframeUrl: 'https://www.google.com/logos/2010/pacman10-i.html', // Mocking with a classic
    category: GameCategory.DRIVING,
    tags: ['retro', 'fast', 'classic']
  },
  {
    id: '2',
    title: 'Block Breaker',
    description: 'Smash your way through endless levels of brick-breaking fun.',
    thumbnail: 'https://picsum.photos/seed/block/400/300',
    iframeUrl: 'https://poki.com/en/g/block-the-pig', // External example (Note: in production these would be local/proxy links)
    category: GameCategory.PUZZLE,
    tags: ['puzzle', 'arcade']
  },
  {
    id: '3',
    title: 'Neon Dash',
    description: 'Avoid obstacles in this high-speed neon-themed endless runner.',
    thumbnail: 'https://picsum.photos/seed/neon/400/300',
    iframeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    category: GameCategory.ACTION,
    tags: ['neon', 'reflex']
  },
  {
    id: '4',
    title: 'Space Invaders',
    description: 'Defend Earth from waves of alien attackers in this arcade classic.',
    thumbnail: 'https://picsum.photos/seed/space/400/300',
    iframeUrl: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: GameCategory.ARCADE,
    tags: ['space', 'shooter']
  },
  {
    id: '5',
    title: 'Penalty Shootout',
    description: 'Test your skills in the ultimate soccer penalty challenge.',
    thumbnail: 'https://picsum.photos/seed/soccer/400/300',
    iframeUrl: 'https://poki.com/en/g/penalty-shooters-2',
    category: GameCategory.SPORTS,
    tags: ['soccer', 'sports']
  },
  {
    id: '6',
    title: 'Chess Pro',
    description: 'Master the game of kings with our advanced AI chess engine.',
    thumbnail: 'https://picsum.photos/seed/chess/400/300',
    iframeUrl: 'https://lichess.org/export/embed/puzzles/daily',
    category: GameCategory.PUZZLE,
    tags: ['strategy', 'brain']
  },
  {
    id: '7',
    title: 'Moto X3M',
    description: 'Awesome bike racing game with crazy stunts and obstacles.',
    thumbnail: 'https://picsum.photos/seed/moto/400/300',
    iframeUrl: 'https://poki.com/en/g/moto-x3m',
    category: GameCategory.DRIVING,
    tags: ['bike', 'stunts']
  },
  {
    id: '8',
    title: 'Subway Surfers',
    description: 'Dash as fast as you can through the subway tracks.',
    thumbnail: 'https://picsum.photos/seed/dash/400/300',
    iframeUrl: 'https://poki.com/en/g/subway-surfers',
    category: GameCategory.ACTION,
    tags: ['runner', 'mobile']
  }
];
