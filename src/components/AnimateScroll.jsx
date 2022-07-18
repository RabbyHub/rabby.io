import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { chains } from "../const";

const getSortList = () => {
  const list = Array.from(chains);
  const index = list.findIndex((chain) => chain.name === "Ethereum");
  [list[0], list[index]] = [list[index], list[0]];
  return list;
};
const list = getSortList();

const AnimateScroll = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((active) => (active + 1) % chains.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-word-list">
      {list.map((chain, index) => {
        return (
          <div
            className={clsx("animate-word", {
              "was-visible": active !== index,
              "is-visible": active === index,
            })}
            key={chain.id}
          >
            {chain.name}
          </div>
        );
      })}
      <div className="animate-word placeholder">{list[active].name}</div>
    </div>
  );
};

export default AnimateScroll;
