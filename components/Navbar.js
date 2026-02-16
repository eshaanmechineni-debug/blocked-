
import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const Navbar = ({ onSearch, onLogoClick }) => {
  return html`
    <nav className="bg-black border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer group" onClick=${onLogoClick}>
            <div className="bg-zinc-100 p-2 rounded-lg mr-3 group-hover:bg-white transition-colors">
              <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tighter text-white uppercase">LILDOGGYBOY<span className="text-zinc-400">.ORG</span></span>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden sm:block">
            <input
              type="text"
              placeholder="Search unblocked games..."
              className="block w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 px-4 text-sm placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400 text-white transition-all"
              onChange=${(e) => onSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4">
            <!-- Discord button removed -->
          </div>
        </div>
      </div>
    </nav>
  `;
};

export default Navbar;