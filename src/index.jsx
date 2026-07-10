import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainRoutes } from './route';
import './index.css';
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MainRoutes />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
