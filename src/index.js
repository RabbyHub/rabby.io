import React from 'react';
import ReactDOM from 'react-dom';
import { eagerLoadTwitterLibrary } from 'react-twitter-widgets';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainRoutes } from './route';
import './index.css';
eagerLoadTwitterLibrary();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MainRoutes />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
