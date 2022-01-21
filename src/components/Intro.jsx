/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";

const Intro = () => {
  const chains = [
    { name: "ETH", icon: "/assets/images/eth.png" },
    { name: "BSC", icon: "/assets/images/bsc.png" },
    { name: "Gnosis", icon: "/assets/images/gnosis.png" },
    { name: "Polygon", icon: "/assets/images/polygon.png" },
    { name: "Fantom", icon: "/assets/images/fantom.png" },
    { name: "OKExChain", icon: "/assets/images/okex.png" },
    { name: "HECO", icon: "/assets/images/heco.png" },
    { name: "Avalanche", icon: "/assets/images/avax.png" },
    { name: "Arbitrum", icon: "/assets/images/arb.png" },
    { name: "Optimism", icon: "/assets/images/op.png" },
    { name: "Celo", icon: "/assets/images/celo.png" },
    { name: "Moonriver", icon: "/assets/images/moonriver.png" },
    { name: "Cronos", icon: "/assets/images/cronos.png" },
    { name: "Bola", icon: "/assets/images/bola.png" },
    { name: "Metis", icon: "/assets/images/metis.png" },
    { name: "BTTC", icon: "/assets/images/bttc.png" },
    { name: "Aurora", icon: "/assets/images/aurora.png" },
    { name: "Moonbeam", icon: "/assets/images/moonbeam.png" },
  ];

  const handleClickDownload = () => {
    window.$.scrollTo(0, {
      duration: 800,
    });
  };

  return (
    <div className="intro">
      <h2 className="title">How is Rabby different from MetaMask</h2>
      <div>
        <div className="intro-content">
          <img
            src="/assets/images/multi-chain-2.png"
            alt="Multi Chain"
            className="left intro-img"
          />
          <div className="right text">
            <div className="intro-title">Multi-chain</div>
            <h3>Smooth multi-chain experience</h3>
            <p>
              Automatically switch to the corresponding chain based on your
              visited site
            </p>
            <div className="chains">
              {chains.map((chain) => (
                <img src={chain.icon} alt={chain.name} key={chain.name} />
              ))}
              <span>More to come</span>
            </div>
          </div>
        </div>
        <div className="intro-content">
          <div className="left text">
            <div className="intro-title">Security</div>
            <h3>Pre-transaction risk scanning</h3>
            <p>Supported by our security rule engine</p>
          </div>
          <img
            src="/assets/images/security-check.png"
            alt="Security"
            className="right intro-img"
          />
        </div>
        <div className="intro-content">
          <img
            src="/assets/images/sign-tx.png"
            alt="Experience"
            className="left intro-img"
          />
          <div className="right text">
            <div className="intro-title">Experience</div>
            <h3>You see exactly what you sign</h3>
            <p>The first wallet showing your estimated balance change</p>
          </div>
        </div>
      </div>
      <div className="download">
        <img src="/assets/images/download-bg.png" className="download-bg" />
        <img
          src="/assets/images/download-bg-mobile.png"
          className="download-bg-mobile"
        />
        <h3 className="white">Get Rabby and Start DeFi</h3>
        <a
          href="javascript:;"
          className="round-button orange"
          onClick={handleClickDownload}
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default Intro;
