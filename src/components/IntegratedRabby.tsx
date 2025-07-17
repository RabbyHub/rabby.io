import React from "react";

const IntegratedRabby = () => {
  return (
    <div className="integrated-doc">
      <div className="bg">
        <div className="number">1000+</div>
        <div className="desc">Dapps Integrated Rabby Wallet</div>
        <a
          href="/docs/integrating-rabby-wallet"
          target="_blank"
          rel="noreferrer"
          className="btn"
        >
          Integration Doc
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M24.5 15H3.5"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.5 8L24.5 15L17.5 22"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default IntegratedRabby;
