import React from "react";
import Header from "./components/Header";
import Intro from "./components/Intro";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="main">
        <Header />
        <Intro />
      </div>
      <Footer />
    </>
  );
}

export default App;
