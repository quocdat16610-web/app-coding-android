import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ROUTER_BASENAME, ROUTER_FUTURE } from './lib/router';
import { useProgressStore } from './store/progressStore';
import './styles/globals.css';

if (import.meta.env.DEV && new URLSearchParams(window.location.search).get('unlockAll') === '1') {
  useProgressStore.setState({ devUnlockAll: true });
}

const root = document.getElementById('root');
if (!root) throw new Error('Không tìm thấy phần tử #root');

createRoot(root).render(
  <StrictMode>
    <BrowserRouter basename={ROUTER_BASENAME} future={ROUTER_FUTURE}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
