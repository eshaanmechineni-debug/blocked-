
import React, { useState } from 'react';
import { Game } from '../types';

interface GameViewerProps {
  game: Game;
  onBack: () => void;
}

const GameViewer: React.FC<GameViewerProps> = ({ game, onBack }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`flex flex-col h-full bg-slate-950 ${isFullscreen ? 'fixed inset-0 z-[100]' : 'min-h-[80vh]'}`}>
      <div className="bg-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center">
          {!isFullscreen && (
            <button 
              onClick={onBack}
              className="mr-4 p-2 text-slate-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          )}
          <div>
            <h2 className="text-xl font-bold text-white leading-none">{game.title}</h2>
            <span className="text-xs text-indigo-400 font-semibold">{game.category}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleFullscreen}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-all"
          >
            {isFullscreen ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0l5 0m-5 0l0 5m5 11l5-5m0 0l-5 0m5 0l0 5" />
                </svg>
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span>Fullscreen</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 relative bg-black">
        <iframe 
          src={game.iframeUrl}
          title={game.title}
          className="absolute inset-0 w-full h-full border-none shadow-2xl"
          allowFullScreen
          allow="autoplay; encrypted-media; fullscreen"
        />
      </div>

      {!isFullscreen && (
        <div className="bg-slate-900 p-6 border-t border-slate-800">
          <div className="max-w-4xl">
            <h3 className="text-lg font-bold text-white mb-2">How to Play</h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {game.description} Use your keyboard arrow keys or WASD to move. Press Space to jump or interact. 
              The exact controls may vary depending on the game mechanics.
            </p>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameViewer;
