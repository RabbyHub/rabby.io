import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="left">
        <div className="debank-logo">
          <img src="/assets/images/logo-debank.png" alt="debank" />
        </div>
        <div className="rabby-logo">
          <img src="/assets/images/logo.png" alt="rabby" />
        </div>
      </div>
      <div className="right">
        <div className="footer-links">
          <a href="https://github.com/RabbyHub/logo" target="_blank">
            Brand
          </a>
          <a href="https://debank.com/docs/privacy/" target="_blank">
            Privacy Policy
          </a>
        </div>
        <p className="copyright">© 2021 rabby.io All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
