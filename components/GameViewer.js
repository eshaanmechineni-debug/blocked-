
import React, { useState } from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const GameViewer = ({ game, onBack }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Map of local game components
  const localComponents = {
    // Currently no local games
  };

  const GameComponent = game.isLocal ? localComponents[game.id] : null;

  return html`
    <div className=${`flex flex-col h-full bg-black rounded-2xl overflow-hidden shadow-2xl ${isFullscreen ? 'fixed inset-0 z-[100] rounded-none' : 'min-h-[85vh] border border-zinc-800'}`}>
      <div className="bg-zinc-950 p-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center">
          ${!isFullscreen && html`
            <button onClick=${onBack} className="mr-4 p-2 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-full transition-colors">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
          `}
          <div>
            <h2 className="text-xl font-bold text-white leading-none">${game.title}</h2>
            <div className="flex items-center mt-1 space-x-2">
              <span className="text-xs text-zinc-300 font-semibold uppercase tracking-wider">${game.category}</span>
              <span className="text-zinc-700 text-xs">•</span>
              <span className="text-xs text-zinc-500 font-medium italic">via ${game.source}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          ${!game.isLocal && html`
            <a href=${game.officialUrl} target="_blank" className="hidden sm:flex items-center bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-3 py-2 rounded-lg text-sm transition-all border border-zinc-800">
               <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
               Official Site
            </a>
          `}
          <button onClick=${() => setIsFullscreen(!isFullscreen)} className="bg-white hover:bg-zinc-200 text-black px-4 py-2 rounded-lg text-sm font-bold shadow-lg transition-colors">
            ${isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>
      <div className="flex-1 relative bg-black">
        ${game.isLocal && GameComponent ? html`
          <${GameComponent} />
        ` : html`
          <iframe 
            id=${game.iframeId || 'game-area'}
            name=${game.iframeName || 'game-area'}
            src=${game.iframeUrl} 
            className="absolute inset-0 w-full h-full border-none" 
            allowFullScreen 
            allow="autoplay; encrypted-media; fullscreen; gamepad; pointer-lock; xr-spatial-tracking; clipboard-write; accelerometer; gyroscope"
            sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin allow-downloads"
          />
        `}
      </div>
      
      ${!isFullscreen && html`
        <div className="bg-zinc-950 p-6 border-t border-zinc-800">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="md:col-span-2">
               <h3 className="text-white font-bold mb-2">Description</h3>
               <p className="text-zinc-400 text-sm leading-relaxed">${game.description}</p>
             </div>
             <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
               <h3 className="text-white font-bold mb-3 text-sm">Game Info</h3>
               <div className="space-y-2">
                 <div className="flex justify-between text-xs">
                   <span className="text-zinc-500 font-medium">Platform</span>
                   <span className="text-zinc-300">${game.isLocal ? 'Integrated HTML5' : 'Web Browser'}</span>
                 </div>
                 <div className="flex justify-between text-xs">
                   <span className="text-zinc-500 font-medium">Publisher</span>
                   <span className="text-zinc-300">${game.source}</span>
                 </div>
                 <div className="flex justify-between text-xs">
                   <span className="text-zinc-500 font-medium">Controls</span>
                   <span className="text-zinc-300">Keyboard / Touch</span>
                 </div>
               </div>
             </div>
           </div>
        </div>
      `}
    </div>
  `;
};

export default GameViewer;
