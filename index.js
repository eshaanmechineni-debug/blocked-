
import React from 'react';
import ReactDOM from 'react-dom/client';
import htm from 'htm';
import App from './App.js';

const html = htm.bind(React.createElement);
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical: Root element #root not found in the DOM.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(html`
      <${React.StrictMode}>
        <${App} />
      <//>
    `);
    console.log("lildoggyboy.org initialized successfully.");
  } catch (err) {
    console.error("Failed to render the application:", err);
  }
}