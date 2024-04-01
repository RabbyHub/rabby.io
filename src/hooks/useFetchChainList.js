import { useState, useEffect } from "react";
import { defaultChainList } from "../const";

export const useFetchChainList = () => {
  const [chains, setChains] = useState(defaultChainList);

  useEffect(() => {
    fetch("https://static.debank.com/supported_chains.json")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) =>
        setChains(
          data
            .filter((item) => !item.is_disabled)
            .sort((a, b) => a.name.localeCompare(b.name))
        )
      );
  }, []);

  return chains;
};
