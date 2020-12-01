/*eslint-disable*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';
import {ResetStyle, GlobalStyle} from './components/globalStyle';

ReactDOM.render(
  <div className='app'>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </div>,
  document.getElementById('root')
);
