import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ReactGA from "react-ga";

import { MetaMaskExport } from "./page/metamask";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

ReactGA.initialize("UA-199755108-2");

ReactGA.pageview("/");

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<App />} />
          <Route path="/metamask-export" element={<MetaMaskExport />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
