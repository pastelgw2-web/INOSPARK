import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Menambahkan ekstensi .tsx agar lebih aman bagi Vite

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Could not find root element to mount to. Make sure index.html has <div id='root'></div>");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);