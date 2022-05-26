import React from "react";
import Header from "./components/Header";
import Intro from "./components/Intro";
import Footer from "./components/Footer";
import Security from "./components/Security";
import IntergrateChains from "./components/IntergrateChains";
import SigningModes from "./components/SigningMode";

function App() {
  const handleClickDownload = () => {
    window.$.scrollTo(0, {
      duration: 800,
    });
  };

  return (
    <>
      <div className="main">
        <Header />
        <Intro />
      </div>
      <Security />
      <div className="intro no-padding">
        <div className="download">
          <img src="/assets/images/download-bg.png" className="download-bg" />
          <img
            src="/assets/images/download-bg-mobile.png"
            className="download-bg-mobile"
          />
          <h3 className="white">Get Rabby and Start DeFi</h3>
          <p>In "Watch Mode", no private key is needed. Experience all fancy features in a risk-free way.</p>
          <a
            href="javascript:;"
            className="round-button orange"
            onClick={handleClickDownload}
          >
            Download
          </a>
        </div>
      </div>
      <div className="main">
        <IntergrateChains />
        <SigningModes />
      </div>
      <Footer />
    </>
  );
}

export default App;
