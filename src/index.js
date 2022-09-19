import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import GlobalStyle from './styles/global';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {console.log(process.env.NODE_ENV)}
    <GlobalStyle />
  </React.StrictMode>
);
