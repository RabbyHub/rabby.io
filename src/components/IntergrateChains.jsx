import React from "react";

const IntergrateChains = () => {
  const chains = [
    { id: 1, name: "Ethereum", icon: "/assets/images/chain-logos/eth.svg" },
    { id: 56, name: "BSC", icon: "/assets/images/chain-logos/bsc.svg" },
    { id: 100, name: "Gnosis", icon: "/assets/images/chain-logos/gnosis.svg" },
    {
      id: 137,
      name: "Polygon",
      icon: "/assets/images/chain-logos/polygon.svg",
    },
    { id: 250, name: "Fantom", icon: "/assets/images/chain-logos/fantom.svg" },
    { id: 66, name: "OKC", icon: "/assets/images/chain-logos/okex.svg" },
    { id: 128, name: "HECO", icon: "/assets/images/chain-logos/heco.svg" },
    { id: 42161, name: "Arbitrum", icon: "/assets/images/chain-logos/arb.svg" },
    {
      id: 43114,
      name: "Avalanche",
      icon: "/assets/images/chain-logos/avax.svg",
    },
    { id: 10, name: "Optimism", icon: "/assets/images/chain-logos/op.svg" },
    { id: 42220, name: "Celo", icon: "/assets/images/chain-logos/celo.svg" },
    {
      id: 1285,
      name: "Moonriver",
      icon: "/assets/images/chain-logos/movr.svg",
    },
    { id: 25, name: "Cronos", icon: "/assets/images/chain-logos/cronos.svg" },
    { id: 288, name: "Boba", icon: "/assets/images/chain-logos/boba.png" },
    { id: 1088, name: "Metis", icon: "/assets/images/chain-logos/metis.svg" },
    { id: 199, name: "BTTC", icon: "/assets/images/chain-logos/bttc.svg" },
    {
      id: 1313161554,
      name: "Aurora",
      icon: "/assets/images/chain-logos/aurora.svg",
    },
    { id: 1284, name: "Moonbeam", icon: "/assets/images/chain-logos/mobm.svg" },
    {
      id: 10000,
      name: "smartBCH",
      icon: "/assets/images/chain-logos/smartBCH.svg",
    },
    { id: 122, name: "Fuse", icon: "/assets/images/chain-logos/fuse.svg" },
    {
      id: 1666600000,
      name: "Harmony",
      icon: "/assets/images/chain-logos/harmony.svg",
    },
    {
      id: 11297108109,
      name: "Palm",
      icon: "/assets/images/chain-logos/palm.svg",
    },
    { id: 592, name: "Astar", icon: "/assets/images/chain-logos/astar.png" },
    { id: 336, name: "Shiden", icon: "/assets/images/chain-logos/shiden.svg" },
    { id: 8217, name: "Klaytn", icon: "/assets/images/chain-logos/klaytn.svg" },
    { id: 4689, name: "IoTeX", icon: "/assets/images/chain-logos/iotx.svg" },
    { id: 30, name: "RSK", icon: "/assets/images/chain-logos/rsk.svg" },
    {
      id: 888,
      name: "Wanchain",
      icon: "/assets/images/chain-logos/wanchain.svg",
    },
    { id: 321, name: "KCC", icon: "/assets/images/chain-logos/kcc.svg" },
    {
      id: 19,
      name: "Songbird",
      icon: "/assets/images/chain-logos/songbird.png",
    },
    { id: 9001, name: "Evmos", icon: "/assets/images/chain-logos/evmos.svg" },
    { id: 53935, name: "DFK", icon: "/assets/images/chain-logos/dfk.svg" },
    { id: 40, name: "Telos", icon: "/assets/images/chain-logos/telos.svg" },
    {
      id: 73772,
      name: "Swimmer",
      icon: "/assets/images/chain-logos/swimmer.svg",
    },
  ];
  return (
    <div className="chains">
      <h2 className="title">Rabby has integrated {chains.length} chains</h2>
      <p>More chains are coming soon</p>
      <ul className="chain-list">
        {chains
          .sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 1;
          })
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
