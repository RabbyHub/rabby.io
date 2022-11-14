import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="left">
        <div className="debank-logo">
          <img src="/assets/images/logo-debank-1.png" alt="debank" />
        </div>
        <div className="rabby-logo">
          <img src="/assets/images/logo-white.svg" alt="rabby" />
        </div>
      </div>
      <div className="right">
        <div className="footer-links">
          <a href="https://github.com/RabbyHub/logo" target="_blank" rel="noreferrer">
            Brand
          </a>
          <a href="/docs/privacy/" target="_blank" rel="noreferrer">
            Privacy Policy
          </a>
        </div>
        <p className="copyright">© 2021 rabby.io All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
