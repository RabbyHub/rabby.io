/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import { showToast } from "../toast";
import AnimateScroll from "./AnimateScroll";
import ReactGA from 'react-ga';

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

  const reportClickDownload = (label) => {
    ReactGA.event({
      category: 'User',
      action: 'clickDownload',
      label
    })
  }

  const handleClickDownloadBtn = (e) => {
    if (/mobile/i.test(navigator.userAgent)) {
      e.preventDefault();
      showToast({
        content: "Please visit this site from the desktop",
        duration: 2000,
      });
    }
    reportClickDownload();
  };

  useEffect(() => {
    initMouseOver();
  }, [initMouseOver]);

  return (
    <header>
      <div className="nav">
        <img src="/assets/images/logo-white.svg" alt="Rabby" className="logo" />
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
          <h1 className="white">
            The game-changing wallet for <AnimateScroll></AnimateScroll>
          </h1>
          <div className="container">
            <div className="features">
              <a
                href="https://github.com/RabbyHub/Rabby/blob/master/docs/SlowMist%20Audit%20Report%20-%20Rabby%20browser%20extension%20wallet-2022.03.18.pdf"
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
              <a
                className={clsx("browser-item enable", {
                  highlight: mouseOver === "chrome",
                })}
                href="https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch"
                target="_blank"
                onClick={() => reportClickDownload('Chrome')}
                onMouseOver={() => setMouseOver("chrome")}
                onMouseLeave={initMouseOver}
                rel="noreferrer"
              >
                <img src="/assets/images/chrome-1.png" alt="Chrome" />
                <p>Download for Chrome</p>
              </a>
              <a
                className={clsx("browser-item enable", {
                  highlight: mouseOver === "brave",
                })}
                href="https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch"
                target="_blank"
                onClick={() => reportClickDownload('Brave')}
                onMouseOver={() => setMouseOver("brave")}
                onMouseLeave={initMouseOver}
                id="brave-browser"
                rel="noreferrer"
              >
                <img src="/assets/images/brave-1.png" alt="Brave" />
                <p>Download for Brave</p>
              </a>
            </div>
            <div className="coming-soon">
              <img src="/assets/images/firefox-small.png" alt="" />
              <img src="/assets/images/edge.svg" alt="" />
              <span>Firefox / Edge version coming soon</span>
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
            src="/assets/images/hero-7.png"
            alt="Dashboard screenshot"
            className="hero-image"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
