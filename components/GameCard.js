import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const GameCard = ({ game, onClick }) => {
  return html`
    <div className="group relative bg-zinc-900 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-zinc-800 hover:border-zinc-700" onClick=${() => onClick(game)}>
      <div className="aspect-video overflow-hidden relative">
        <img src=${game.thumbnail} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0" />
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
           <span className="text-[9px] uppercase font-bold tracking-widest bg-white/90 text-black px-2 py-0.5 rounded shadow-sm">
            ${game.source}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-white text-lg leading-tight group-hover:text-zinc-200">${game.title}</h3>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-zinc-800 text-zinc-400 px-2 py-1 rounded">${game.category}</span>
        </div>
        <p className="text-zinc-500 text-xs line-clamp-2 mb-3">${game.description}</p>
        <div className="flex flex-wrap gap-2">
          ${game.tags.map(tag => html`<span key=${tag} className="text-[10px] text-zinc-500 bg-black/50 px-2 py-0.5 rounded border border-zinc-800">#${tag}</span>`)}
        </div>
      </div>
    </div>
  `;
};

export default GameCard;