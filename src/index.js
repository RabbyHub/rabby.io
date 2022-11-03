import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import { BrowserRouter as Router } from "react-router-dom";
import { MainRoutes } from "./route";
import "./index.css";

ReactGA.initialize("UA-199755108-2");

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <MainRoutes />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
