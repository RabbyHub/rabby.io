import React from "react";
import styles from "./style.module.scss";
import { LINKS, EMAIL_LIST } from "../../constants/links";
import { MACOS_DOWNLOAD_INFO } from "../Download/download-info";
import { HoverPopup } from "../HoverPopup";
import { ga } from "../../ga";

const Footer = () => {
  const footerList = [
    {
      sectionTitle: "Contact Us",
      items: [
        {
          title: "X",
          value: LINKS.SOCIAL.TWITTER,
        },
        {
          title: "GitHub",
          value: LINKS.SOCIAL.GITHUB,
        },
        {
          title: "Discord",
          value: LINKS.SOCIAL.DISCORD,
        },
        {
          title: "Email"
        },
        {
          title: "DeBank Hi",
          value: LINKS.SOCIAL.DEBANK,
        }
      ]
    },
    {
      sectionTitle: "Download",
      items: [
        {
          title: "Chrome",
          value: LINKS.DOWNLOAD.CHROME,
        },
        {
          title: "AppStore",
          value: LINKS.DOWNLOAD.APP_STORE,
        },
        {
          title: "Google Play",
          value: LINKS.DOWNLOAD.GOOGLE_PLAY,
        },
      ]
    },
    {
      sectionTitle: "Support",
      items: [
        {
          title: "Help Center",
          value: LINKS.SUPPORT.HELP_CENTER,
        },
        {
          title: "Rabby Kit",
          value: LINKS.SUPPORT.RABBY_KIT,
        },
        {
          title: "Integration Doc",
          value: LINKS.SUPPORT.INTEGRATION_DOC,
        },
        {
          title: "Chain Dashboard",
          value: LINKS.SUPPORT.CHAIN_DASHBOARD,
        }
      ]
    },
    {
      sectionTitle: "Security & Transparency",
      items: [
        {
          title: "Open Source on GitHub",
          value: LINKS.SECURITY.OPEN_SOURCE,
        },
        {
          title: "Audited by SlowMist",
          value: LINKS.SECURITY.AUDIT_SLOWMIST,
        },
        {
          title: "Audited by Least Authority",
          value: LINKS.SECURITY.AUDIT_LEAST_AUTHORITY,
        },
        {
          title: "Terms of Use",
          value: LINKS.SECURITY.TERMS_OF_USE,
        },
        {
          title: "Privacy Policy",
          value: LINKS.SECURITY.PRIVACY_POLICY,
        }
      ]
    },
  ];

  const reportClickDownload = (report) => {
    ga.event({
      category: 'User',
      action: 'clickDownload',
      label: report
    });
  };

  // 点击处理
  const handleLinkClick = (e, href, title, shouldReport = false, shouldRedirect = true) => {
    e.preventDefault();
    if (shouldReport) {
      reportClickDownload(title);
    }
    if (shouldRedirect) {
      window.open(href, '_blank');
    }
  };

  // 链接渲染
  const renderLink = (href, title, shouldReport = false, shouldRedirect = true) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => handleLinkClick(e, href, title, shouldReport, shouldRedirect)}
    >
      {title}
    </a>
  );

  // 弹窗容器渲染
  const renderPopupContainer = (children, arrowClassName = styles.emailPopupArrow) => (
    <div className={styles.emailPopupContainer}>
      <div className={styles.emailPopup}>
        {children}
      </div>
      <img src="/assets/images/polygon-2.svg" alt="arrow" className={arrowClassName}/>
    </div>
  );

  // 渲染不同类型的链接
  const renderFooterItem = (subItem, sectionTitle) => {
    // Email 弹窗
    if (subItem.title === 'Email') {
      return (
        <HoverPopup
          key={subItem.title}
          children={
            <div className={styles.footerItemList}>
              {renderLink('#', subItem.title, false, false)}
            </div>
          }
          popup={renderPopupContainer(
            EMAIL_LIST.map((email) => (
              <a key={email.name} href={email.link} target="_blank" rel="noreferrer">
                {email.name}
              </a>
            ))
          )}
        />
      );
    }

    // macOS 下载弹窗
    if (subItem.title === 'macOS') {
      return (
        <HoverPopup
          key={subItem.title}
          children={
            <div className={styles.footerItemList}>
              {renderLink('#', subItem.title, false, false)}
            </div>
          }
          popup={renderPopupContainer(
            Object.entries(MACOS_DOWNLOAD_INFO).map(([key, value]) => (
              <a
                key={key}
                href={value.href}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => handleLinkClick(e, value.href, value.title, true)}
              >
                {value.title}
              </a>
            ))
          )}
        />
      );
    }

    // 普通链接
    return (
      <div className={styles.footerItemList} key={subItem.title}>
        {renderLink(
          subItem.value,
          subItem.title,
          sectionTitle === 'Download'
        )}
      </div>
    );
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogo}>
        <img src="/assets/images/logo-new.svg" alt="rabby" />
        <div className={styles.footerLogoText}>© 2025 rabby.io All rights reserved.</div>
      </div>
      <div className={styles.footerList}>
        {footerList.map((item) => (
          <div className={styles.footerItem} key={item.sectionTitle}>
            <div className={styles.footerItemTitle}>{item.sectionTitle}</div>
            <div>
              {item.items.map((subItem) => renderFooterItem(subItem, item.sectionTitle))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
