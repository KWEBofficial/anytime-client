import ReactDOM from 'react-dom/client';
import React from 'react';

import { ModalContextProvider } from './components/Modal/useModal';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
  </React.StrictMode>,
);
