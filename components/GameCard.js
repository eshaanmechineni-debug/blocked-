
import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const GameCard = ({ game, onClick }) => {
  return html`
    <div className="group relative bg-slate-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-slate-700/50" onClick=${() => onClick(game)}>
      <div className="aspect-video overflow-hidden">
        <img src=${game.thumbnail} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-white text-lg leading-tight group-hover:text-indigo-400">${game.title}</h3>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-slate-700 text-slate-300 px-2 py-1 rounded">${game.category}</span>
        </div>
        <p className="text-slate-400 text-xs line-clamp-2 mb-3">${game.description}</p>
        <div className="flex flex-wrap gap-2">
          ${game.tags.map(tag => html`<span key=${tag} className="text-[10px] text-slate-500 bg-slate-900/50 px-2 py-0.5 rounded border border-slate-700">#${tag}</span>`)}
        </div>
      </div>
    </div>
  `;
};

export default GameCard;
