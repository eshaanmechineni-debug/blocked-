
import { GameCategory } from './types.js';

export const GAMES = [
  {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    description: 'Retro Bowl is the perfect game for the armchair quarterback to finally prove a point. Can you manage your team, players, and calls to win the ultimate prize? Features retro-style graphics and deep management mechanics.',
    thumbnail: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80&w=800',
    iframeUrl: 'https://freegamesunblocked76.github.io/retro-bowl/',
    category: GameCategory.SPORTS,
    tags: ['sports', 'retro', 'football', 'strategy'],
    source: 'GitHub',
    officialUrl: 'https://freegamesunblocked76.github.io/retro-bowl/'
  },
  {
    id: 'chess',
    title: 'Chess',
    description: 'Master the game of kings. Challenge your mind with tactical puzzles and strategic gameplay. Perfect for players of all skill levels looking to sharpen their focus.',
    thumbnail: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=800',
    iframeUrl: 'https://lichess.org/training/frame?theme=brown&bg=dark',
    category: GameCategory.PUZZLE,
    tags: ['strategy', 'classic', 'board-game', 'puzzle'],
    source: 'Lichess',
    officialUrl: 'https://lichess.org/'
  },
  {
    id: 'rocket-goal',
    title: 'Rocket Goal',
    description: 'Experience the thrill of high-speed motorized soccer. Drive your rocket-powered car to hit the ball into the opponent\'s goal. Fast-paced physics-based sports action right in your browser.',
    thumbnail: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&q=80&w=800',
    iframeUrl: 'https://rocketgoal.io/',
    category: GameCategory.SPORTS,
    tags: ['sports', 'cars', 'multiplayer', 'physics'],
    source: 'RocketGoal',
    officialUrl: 'https://rocketgoal.io/'
  },
  {
    id: 'hextris',
    title: 'Hextris',
    description: 'Hextris is a fast-paced puzzle game inspired by Tetris. Rotate the hexagon to catch falling colored blocks. Match three or more blocks of the same color to clear them and keep the hexagon from filling up!',
    thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
    iframeUrl: 'https://hextris.github.io/hextris/',
    category: GameCategory.PUZZLE,
    tags: ['puzzle', 'arcade', 'fast-paced', 'match-3'],
    source: 'GitHub',
    officialUrl: 'https://hextris.io/'
  },
  {
    id: 'space-wave-429406',
    title: 'Space Wave',
    description: 'Survive the cosmic waves in this high-octane space arcade challenge. Navigate through treacherous fields and prove your skills in the void.',
    thumbnail: 'https://i.ytimg.com/vi/1_C7P8G8jG8/maxresdefault.jpg',
    iframeUrl: 'https://app-429406.games.s3.yandex.net/429406/dn7gfjstxjolhwe852ewv7uwl0mv2gt1_brotli/index.html?sdk=%2Fsdk%2F_%2Fv2.3be05f4fbb5f415214c9.js#origin=https%3A%2F%2Fplayhop.com&app-id=429406&device-type=desktop',
    category: GameCategory.ARCADE,
    tags: ['action', 'webgl', 'survival'],
    source: 'Interstellar',
    officialUrl: 'https://playhop.com/app/429406'
  },
  {
    id: 'slope',
    title: 'Slope',
    description: 'Drive a ball in the 3D running game in Slope Game. Easy to control, high speed, and addictive gameplay. Drive your ball to follow the straight line in space and avoid obstacles as they crash through the race.',
    thumbnail: 'https://images.unsplash.com/photo-1558485940-8ee7791244fd?auto=format&fit=crop&q=80&w=800',
    iframeUrl: 'https://kdata1.com/2020/05/slope/',
    category: GameCategory.ARCADE,
    tags: ['3d', 'running', 'fast-paced'],
    source: 'Unity',
    officialUrl: 'https://slopegame.io/'
  }
];
