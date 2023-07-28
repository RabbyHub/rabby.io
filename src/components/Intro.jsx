/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

const Intro = () => {
  return (
    <div className="intro">
      <h2 className="title">How is Rabby different from MetaMask</h2>
      <div>
        <div className="intro-content">
          <img
            src="/assets/images/multi-chain-3.png"
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
          </div>
        </div>
        <div className="intro-content">
          <div className="left text">
            <div className="intro-title">Security</div>
            <h3>Pre-sign check for Security</h3>
            <p>Supported by Rabby security engine</p>
          </div>
          <img
            src="/assets/images/security-check-3.png"
            alt="Security"
            className="right intro-img"
          />
        </div>
        <div className="intro-content">
          <img
            src="/assets/images/sign-tx-3.png"
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
    </div>
  );
};

export default Intro;
