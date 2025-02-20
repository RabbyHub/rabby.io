import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const MobileRedirect = () => {
  const { search, pathname } = useLocation();

  useEffect(() => {
    window.location.replace(
      `rabby://${pathname?.replace("/mobile-redirect/", "")}${search}`
    );
  }, [pathname, search]);

  return <>{null}</>;
};
