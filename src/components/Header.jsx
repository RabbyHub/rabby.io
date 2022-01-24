/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import { showToast } from "../toast";

const Header = () => {
  const [isExpand, setIsExpand] = useState(false);
  const [mouseOver, setMouseOver] = useState("");
  const isFirefox = /firefox/i.test(navigator.userAgent);
  const isBrave = /brave/i.test(navigator.userAgent);
  const isEdge = /edg\//i.test(navigator.userAgent);
  const isChrome = !isBrave && !isEdge && /chrome/i.test(navigator.userAgent);

  const initMouseOver = useCallback(() => {
    if (isChrome) setMouseOver("chrome");
    if (isEdge) setMouseOver("edge");
    if (isBrave) setMouseOver("brave");
    if (isFirefox) setMouseOver("firefox");
  }, [isBrave, isChrome, isEdge, isFirefox]);

  const handleClickMenuBtn = () => {
    setIsExpand(!isExpand);
  };

  const handleClickDownloadBtn = (e) => {
    if (/mobile/i.test(navigator.userAgent)) {
      e.preventDefault();
      showToast({
        content: "Please visit this site from the desktop",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    initMouseOver();
  }, [initMouseOver]);

  return (
    <header>
      <div className="nav">
        <img src="/assets/images/logo.png" alt="Rabby" className="logo" />
        <a
          href="javascript:;"
          className={clsx("menu-btn", { expand: isExpand })}
          onClick={handleClickMenuBtn}
        >
          <i></i>
          <i></i>
          <i></i>
        </a>
        <ul className={clsx("menu", { show: isExpand })}>
          <li>
            <a
              href="https://twitter.com/Rabby_io"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/@rabby_io"
              target="_blank"
              rel="noreferrer"
            >
              Medium
            </a>
          </li>
          <li>
            <a href="https://t.me/rabby_io" target="_blank" rel="noreferrer">
              Telegram
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/seFBCWmUre"
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
          </li>
          <li>
            <a
              href="https://github.com/RabbyHub/Rabby"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
          {/* <li><a className="menu-download round-button transparent" href="https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch" target="_blank">Download</a></li> */}
        </ul>
      </div>
      <div className="header-content">
        <div className="left">
          <h1 className="white">A better extension wallet for DeFi users</h1>
          <div className="features">
            <a
              href="https://github.com/RabbyHub/Rabby/blob/master/docs/Rabby%20chrome%20extension%20Penetration%20Testing%20Report.pdf"
              target="_blank"
              className="feature-item"
              rel="noreferrer"
            >
              <img
                src="/assets/images/slowmist.png"
                alt="SlowMist"
                className="icon"
              />
              Audited by SlowMist
            </a>
            <a
              href="https://github.com/RabbyHub/Rabby"
              target="_blank"
              className="feature-item"
              rel="noreferrer"
            >
              <img
                src="/assets/images/github.png"
                alt="Open Source"
                className="icon"
              />
              Open Source
            </a>
          </div>
          <div className="browsers">
            <p className="browsers-title">Download For</p>
            <a
              className={clsx("browser-item enable", {
                highlight: mouseOver === "chrome",
              })}
              href="https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch"
              target="_blank"
              onMouseOver={() => setMouseOver("chrome")}
              onMouseLeave={initMouseOver}
              rel="noreferrer"
            >
              <img src="/assets/images/chrome.png" alt="Chrome" />
              <p>Chrome</p>
            </a>
            <div className="tooltip">
              <a
                className={clsx("browser-item", {
                  highlight: mouseOver === "firefox",
                })}
                onMouseOver={() => setMouseOver("firefox")}
                onMouseLeave={initMouseOver}
                href="#"
              >
                <img src="/assets/images/firefox.png" alt="Firefox" />
                <p>Firefox</p>
              </a>
              <div className="tooltip-text tooltip-top">Coming Soon</div>
            </div>
            <div className="tooltip">
              <a
                className={clsx("browser-item", {
                  highlight: mouseOver === "edge",
                })}
                onMouseOver={() => setMouseOver("edge")}
                onMouseLeave={initMouseOver}
                title="Coming Soon"
                href="#"
              >
                <img src="/assets/images/edge.png" alt="Edge" />
                <p>Edge</p>
              </a>
              <div className="tooltip-text tooltip-top">Coming Soon</div>
            </div>
            <a
              className={clsx("browser-item enable", {
                highlight: mouseOver === "brave",
              })}
              href="https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch"
              target="_blank"
              onMouseOver={() => setMouseOver("brave")}
              onMouseLeave={initMouseOver}
              id="brave-browser"
              rel="noreferrer"
            >
              <img src="/assets/images/brave.png" alt="Brave" />
              <p>Brave</p>
            </a>
          </div>
          <div className="actions">
            <a
              href="https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch"
              target="_blank"
              className="download-btn round-button orange"
              onClick={handleClickDownloadBtn}
              rel="noreferrer"
            >
              Download
            </a>
            <a
              href="https://discord.gg/seFBCWmUre"
              target="_blank"
              className="round-button border"
              rel="noreferrer"
            >
              <img
                src="/assets/images/discord.png"
                alt=""
                className="icon-discord"
              />
              Join the discussion
            </a>
          </div>
        </div>
        <img
          src="/assets/images/hero-6.png"
          alt="Dashboard screenshot"
          className="hero-image"
        />
      </div>
    </header>
  );
};

export default Header;
