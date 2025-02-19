import { useEffect } from "react";

export const MobileRedirectClose = () => {
  useEffect(() => {
    window.close();
  }, []);
  return <>{null}</>;
};
