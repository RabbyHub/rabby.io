import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import App from "./App";
import { MetaMaskExport } from "./page/metamask";
import { UpdateExtension } from "./page/update-extension";
import { DesktopPage } from "./page/desktop";
import { ga } from "./ga";
import { ChainDashboard } from "./page/chain-dashboard";
import { queryClient } from "./service";
import { QueryClientProvider } from "react-query";
import { Uninstalled } from "./page/uninstalled";
import { MobileRedirect } from "./page/mobile-redirect";
import { MobileRedirectClose } from "./page/mobile-redirect/close";

export const MainRoutes = () => {
  let location = useLocation();

  useEffect(() => {
    // Google Analytics
    const path = window.location.pathname + window.location.search;
    ga.pageview(path);
  }, [location]);
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/">
          <Route index element={<App />} />
          <Route path="/metamask-export" element={<MetaMaskExport />} />
          <Route path="/update-extension" element={<UpdateExtension />} />
          <Route path="/desktop" element={<DesktopPage />} />
          <Route path="/chain-dashboard" element={<ChainDashboard />} />
          <Route path="/uninstalled" element={<Uninstalled />} />
          <Route path="/mobile-redirect/*" element={<MobileRedirect />} />
          <Route path="/mobile-buy-close" element={<MobileRedirectClose />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};
