import { useEffect } from "react";

export const MobileRedirect = () => {
  useEffect(() => {
    window.location.replace("rabby://buy");
  });
  return <>{null}</>;
};
