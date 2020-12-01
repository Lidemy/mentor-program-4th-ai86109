/*eslint-disable*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';
import {ResetStyle, GlobalStyle} from './components/globalStyle';

const boardBackground = {
  background: 'rgba(0.2, 0.2, 0.2, 0.2)',
  height: '1080px'
}

ReactDOM.render(
  <div className={App} style={boardBackground}>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </div>,
  document.getElementById('root')
);
