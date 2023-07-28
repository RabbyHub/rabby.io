import React from 'react';
import { chains, testnetChains } from '../const';

const IntergrateChains = () => {
  return (
    <div className="chains">
      <h2 className="title">
        Rabby has integrated {chains.length + testnetChains.length} chains
      </h2>
      <p className="part-title">Mainnets</p>
      <ul className="chain-list">
        {chains.map((chain) => (
          <li key={chain.id}>
            <img className="chain-logo" src={chain.logo} alt={chain.name} />
            {chain.name}
          </li>
        ))}
      </ul>
      <p className="part-title">Testnets</p>
      <ul className="chain-list">
        {testnetChains.map((chain) => (
          <li key={chain.id}>
            <img className="chain-logo" src={chain.logo} alt={chain.name} />
            {chain.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IntergrateChains;
