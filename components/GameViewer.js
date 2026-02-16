
import React, { useState } from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const GameViewer = ({ game, onBack }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return html`
    <div className=${`flex flex-col h-full bg-slate-950 ${isFullscreen ? 'fixed inset-0 z-[100]' : 'min-h-[80vh]'}`}>
      <div className="bg-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center">
          ${!isFullscreen && html`
            <button onClick=${onBack} className="mr-4 p-2 text-slate-400 hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
          `}
          <div>
            <h2 className="text-xl font-bold text-white leading-none">${game.title}</h2>
            <span className="text-xs text-indigo-400 font-semibold">${game.category}</span>
          </div>
        </div>
        <button onClick=${() => setIsFullscreen(!isFullscreen)} className="bg-slate-800 text-slate-300 px-4 py-2 rounded-lg text-sm">
          ${isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>
      <div className="flex-1 relative bg-black">
        <iframe src=${game.iframeUrl} className="absolute inset-0 w-full h-full border-none" allowFullScreen />
      </div>
    </div>
  `;
};

export default GameViewer;
