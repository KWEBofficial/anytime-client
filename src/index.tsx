import ReactDOM from 'react-dom/client';
import React from 'react';
import { ModalContextProvider } from './components/Modal/useModal';

import App from './App';
import './index.css';
import Sidebar from './components/Sidebar';

// 리액트로 짠 모든 코드가 App 컴포넌트 안에 들어가게 됩니다.
// root를 찾아서 App 컴포넌트를 렌더링합니다.
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ModalContextProvider>
      <App />
    </ModalContextProvider>
  </React.StrictMode>,
);
