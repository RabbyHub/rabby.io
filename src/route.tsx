import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ReactGa from "react-ga";
import App from "./App";
import { MetaMaskExport } from "./page/metamask";

export const MainRoutes = () => {
  let location = useLocation();

  useEffect(() => {
    // Google Analytics
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, [location]);
  return (
    <Routes>
      <Route path="/">
        <Route index element={<App />} />
        <Route path="/metamask-export" element={<MetaMaskExport />} />
      </Route>
    </Routes>
  );
};
