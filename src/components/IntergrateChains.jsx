import React from "react";
import { chains } from "../const";

const IntergrateChains = () => {
  return (
    <div className="chains">
      <h2 className="title">Rabby has integrated {chains.length} chains</h2>
      <p>More chains are coming soon</p>
      <ul className="chain-list">
        {chains
          .map((chain) => (
            <li key={chain.id}>
              <img className="chain-logo" src={chain.icon} alt={chain.name} />
              {chain.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default IntergrateChains;
