import clsx from "clsx";
import React, { useEffect, useState, useMemo } from "react";

const getSortList = (chains) => {
  const list = Array.from(chains);
  const index = list.findIndex((chain) => chain.name === "Ethereum");
  [list[0], list[index]] = [list[index], list[0]];
  return list;
};

const AnimateScroll = ({ chains }) => {
  const [active, setActive] = useState(0);

  const list = useMemo(() => {
    return getSortList(chains);
  }, [chains]);

  useEffect(() => {
    if (!list?.length) {
      return;
    }
    const interval = setInterval(() => {
      setActive((active) => (active + 1) % list.length);
    }, 4000);
    return () => {
      clearInterval(interval);
      setActive(0);
    };
  }, [list.length]);

  if (!list?.length) {
    return null;
  }

  return (
    <div className="animate-word-list">
      {list.map((chain, index) => {
        return (
          <div
            className={clsx("animate-word", {
              "was-visible": active !== index,
              "is-visible": active === index,
            })}
            // key={chain?.id}
          >
            {chain?.name}
          </div>
        );
      })}
      <div className="animate-word placeholder">{list[active]?.name}</div>
    </div>
  );
};

export default AnimateScroll;
