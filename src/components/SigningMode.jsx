import React from "react";

const SigningModes = () => {
  const hardwareWallets = [
    { name: "BitBox02", icon: "/assets/images/brand-logos/bitbox.jpg" },
    { name: "GridPlus", icon: "/assets/images/brand-logos/gridplus.jpg" },
    { name: "Keystone", icon: "/assets/images/brand-logos/keystone.jpg" },
    { name: "Ledger", icon: "/assets/images/brand-logos/ledger.jpg" },
    { name: "OneKey", icon: "/assets/images/brand-logos/onekey.jpg" },
    { name: "Trezor", icon: "/assets/images/brand-logos/trezor.jpg" },
  ];
  const institutionalWallets = [
    { name: "Amber", icon: "/assets/images/brand-logos/amber.jpg" },
    { name: "Cobo Wallet", icon: "/assets/images/brand-logos/cobo.jpg" },
    { name: "FireBlocks", icon: "/assets/images/brand-logos/fireblocks.jpg" },
    { name: "Gnosis Safe", icon: "/assets/images/brand-logos/gnosis-safe.jpg" },
    { name: "Jade Wallet", icon: "/assets/images/brand-logos/jade.jpg" },
  ];
  const mobileWallets = [
    { name: "imToken", icon: "/assets/images/brand-logos/imtoken.jpg" },
    { name: "Math Wallet", icon: "/assets/images/brand-logos/math.jpg" },
    {
      name: "Token Pocket",
      icon: "/assets/images/brand-logos/token-pocket.jpg",
    },
    { name: "Trust Wallet", icon: "/assets/images/brand-logos/trust.jpg" },
    {
      name: "MetaMask Mobile",
      icon: "/assets/images/brand-logos/metamask.jpg",
    },
  ];
  return (
    <div className="signing-modes">
      <h2 className="title">Support multiple signing modes</h2>
      <p>You can sign a transation in any of the following ways</p>
      <div className="signing-modes-wrapper">
        <div className="signing-modes-card">
          <h3>Hardware Wallets</h3>
          <ul>
            {hardwareWallets.map((item) => (
              <li key={item.name}>
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="signing-modes-card">
          <h3>Institutional Wallets</h3>
          <ul>
            {institutionalWallets.map((item) => (
              <li key={item.name}>
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="signing-modes-card">
          <h3>Mobile Wallets</h3>
          <ul>
            {mobileWallets.map((item) => (
              <li key={item.name}>
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SigningModes;
