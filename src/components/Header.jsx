/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Main } from "./main";
import React, { useRef, useState } from "react";
import { LINKS } from "../constants/links";

const Header = ({ onDownloadClick, onContactClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef(null);

  const menuLinks = [
    { 
      href: "#contact-us", 
      label: "Contact Us",
      onClick: (e) => {
        e.preventDefault();
        onContactClick();
      }
    },
    { href: LINKS.SUPPORT.HELP_CENTER, label: "Help Center", external: true },
    { href: LINKS.SUPPORT.RABBY_KIT, label: "Rabby Kit", external: true },
    { href: LINKS.SUPPORT.INTEGRATION_DOC, label: "Integration Doc", external: true },
  ];

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setMenuOpen(false), 200);
  };

  const handleLinkClick = (link, e) => {
    if (link.onClick) {
      link.onClick(e);
    }
  };

  return (
    <header>
      <div className="nav">
        <div className="nav-left">
          <img src="/assets/images/logo-new.svg" alt="Rabby" className="logo" />
          <ul className="menu">
            {menuLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  onClick={(e) => handleLinkClick(link, e)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-right">
          <button className="round-button primary download-btn"
            onClick={onDownloadClick}>Download</button>
          <div
            className="menu-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/assets/images/menu.svg" alt="menu" className="menu-icon" />
            <div className="menu-panel" style={{ display: menuOpen ? 'block' : 'none' }}>
              {menuLinks.map((link) => (
                <div className="menu-item" key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    onClick={(e) => handleLinkClick(link, e)}
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
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
