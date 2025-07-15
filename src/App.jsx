import React, { useRef } from "react";
import Header from "./components/Header";
import IntergrateChains from "./components/ChainList/IntergrateChains";
import { useFetchChainList } from "./hooks/useFetchChainList";
import CardList from "./components/DemoCard/CardList";
import CommentList from "./components/CommentCard/CommentList";
import Download from "./components/Download/Download";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer/Footer";

function App() {
  const downloadRef = useRef(null);
  const contactRef = useRef(null);

  const handleClickDownload = () => {
    downloadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClickContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const chains = useFetchChainList();

  return (
    <>
      <div className="main">
        <Header onDownloadClick={handleClickDownload} onContactClick={handleClickContact} />
      </div>
      <div className="section-title">
        Simple, Fast, Secure, Everything On-Chain
      </div>
      <CardList />
      <div className="section-title">
        Best Choice for All EVM Chains
      </div>
      <IntergrateChains chains={chains} rows={4}/>
      <div className="section-title">
        <img
          className="twitter-icon"
          src="/assets/images/twitter.svg"
          alt="twitter"
        />
        <div>Chosen, Used, Recommended — Across Web3</div>
      </div>
      <CommentList rows={2} />
      <Download ref={downloadRef} />
      <ContactUs ref={contactRef} />
      <Footer />
    </>
  );
}

export default App;
