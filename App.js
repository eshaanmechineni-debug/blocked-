
import React, { useState, useMemo } from 'react';
import htm from 'htm';
import Navbar from './components/Navbar.js';
import GameCard from './components/GameCard.js';
import GameViewer from './components/GameViewer.js';
import { GAMES } from './constants.js';
import { GameCategory } from './types.js';

const html = htm.bind(React.createElement);

const App = () => {
  const [activeCategory, setActiveCategory] = useState(GameCategory.ALL);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesCategory = activeCategory === GameCategory.ALL || game.category === activeCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            game.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => setSelectedGame(null);
  const categories = Object.values(GameCategory);

  return html`
    <div className="min-h-screen flex flex-col">
      <${Navbar} 
        onSearch=${setSearchTerm} 
        onLogoClick=${() => {
          setSelectedGame(null);
          setActiveCategory(GameCategory.ALL);
        }} 
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        ${selectedGame ? html`
          <${GameViewer} game=${selectedGame} onBack=${handleBack} />
        ` : html`
          <div>
            <div className="mb-12 relative overflow-hidden rounded-3xl bg-indigo-900 h-64 sm:h-80 flex items-center shadow-2xl">
              <div className="absolute inset-0">
                <img src="https://picsum.photos/seed/nexus/1200/600" className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"></div>
              </div>
              <div className="relative px-8 sm:px-12 max-w-2xl">
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">Community Favorite</span>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">Play Your Way, <br/><span className="text-indigo-400">Anywhere.</span></h1>
                <p className="text-slate-300 text-lg mb-6 leading-relaxed">Fast, lightweight, and completely unblocked. Browse our library of ${GAMES.length} curated HTML5 games.</p>
                <button onClick=${() => handleGameSelect(GAMES[Math.floor(Math.random() * GAMES.length)])} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-xl shadow-indigo-500/30 flex items-center">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                  Random Game
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              ${categories.map(cat => html`
                <button key=${cat} onClick=${() => setActiveCategory(cat)} className=${`px-5 py-2 rounded-full text-sm font-bold transition-all border whitespace-nowrap ${activeCategory === cat ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'}`}>
                  ${cat}
                </button>
              `)}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              ${filteredGames.length > 0 ? filteredGames.map(game => html`
                <${GameCard} key=${game.id} game=${game} onClick=${handleGameSelect} />
              `) : html`
                <div className="col-span-full py-20 text-center">
                  <div className="bg-slate-800/50 rounded-2xl p-10 max-w-md mx-auto border border-dashed border-slate-700">
                    <h3 className="text-xl font-bold text-white mb-2">No games found</h3>
                    <p className="text-slate-500">Try searching for something else or browse another category.</p>
                  </div>
                </div>
              `}
            </div>
          </div>
        `}
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          <p>&copy; 2024 Nexus Unblocked Games. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `;
};

export default App;
