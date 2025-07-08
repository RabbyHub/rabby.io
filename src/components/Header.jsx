/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Main } from "./main";

const Header = ({ onDownloadClick }) => {

  return (
    <header>
      <div className="nav">
        <div className="nav-left">
          <img src="/assets/images/logo-white.svg" alt="Rabby" className="logo" />
          <ul className="menu">
            <li>
              <a href="#contact-us">Contact Us</a>
            </li>

            <li>
              <a href="https://support.rabby.io" target="_blank" rel="noreferrer">
                Help Center
              </a>
            </li>
            <li>
              <a
                href="https://rabbykit.rabby.io/"
                target="_blank"
                rel="noreferrer"
              >
                Rabby Kit
              </a>
            </li>
            <li>
              <a
                href="/docs/integrating-rabby-wallet/"
                target="_blank"
                rel="noreferrer"
              >
                Integration Doc
              </a>
            </li>
          </ul>
        </div>
        <div className="nav-right">
          <button className="round-button primary download-btn"
            onClick={onDownloadClick}>Download</button>
        </div>
      </div>
      <div className="header-content">
        <img src="/assets/logos/symbol.svg" alt="Rabby" className="symbol" />
        <img src="/assets/images/slogon.svg" alt="slogon" className="slogan" />
        <Main />
      </div>
    </header>
  );
};

export default Header;
