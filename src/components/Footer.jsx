import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="main">
        <div className="left">
          <div className="rabby-logo">
            <img src="/assets/images/logo-white.svg" alt="rabby" />
          </div>
        </div>
        <div className="right">
          <div className="footer-links">
            <a
              href="https://github.com/RabbyHub/logo"
              target="_blank"
              rel="noreferrer"
            >
              Brand
            </a>
            <a href="/docs/privacy/" target="_blank" rel="noreferrer">
              Privacy Policy
            </a>
          </div>
          <p className="copyright">© 2024 rabby.io All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
