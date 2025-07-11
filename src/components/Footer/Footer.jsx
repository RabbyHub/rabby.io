import React from "react";
import styles from "./style.module.scss";
import { LINKS } from "../../constants/links";

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
          title: "Github",
          value: LINKS.SOCIAL.GITHUB,
        },
        {
          title: "Discord",
          value: LINKS.SOCIAL.DISCORD,
        },
        {
          title: "Email",
          value: LINKS.SOCIAL.EMAIL.replace('mailto:', ''),
        },
        {
          title: "Debank",
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
          title: "iOS",
          value: LINKS.DOWNLOAD.APP_STORE,
        },
        {
          title: "Android",
          value: LINKS.DOWNLOAD.GOOGLE_PLAY,
        },
        {
          title: "Mac",
          value: LINKS.DOWNLOAD.MACOS_INTEL,
        },
        {
          title: "Windows",
          value: LINKS.DOWNLOAD.WINDOWS,
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
          title: "Integrated Doc",
          value: LINKS.SUPPORT.INTEGRATION_DOC,
        },
        {
          title: "Chain Dashboard",
          value: LINKS.SUPPORT.CHAIN_DASHBOARD,
        }
      ]
    },
    {
      sectionTitle: "Security",
      items: [
        {
          title: "Audit by SlowMist",
          value: LINKS.SECURITY.AUDIT_SLOWMIST,
        },
        {
          title: "Audit by Least Authority",
          value: LINKS.SECURITY.AUDIT_LEAST_AUTHORITY,
        },
        {
          title: "Open Source",
          value: LINKS.SECURITY.OPEN_SOURCE,
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

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogo}>
        <img src="/assets/images/logo-white.svg" alt="rabby" />
        <div className={styles.footerLogoText}>© 2025 rabby.io All rights reserved.</div>
      </div>
      <div className={styles.footerList}>
        {footerList.map((item) => (
          <div className={styles.footerItem} key={item.sectionTitle}>
            <div className={styles.footerItemTitle}>{item.sectionTitle}</div>
            <div>
              {item.items.map((item) => (
                <div className={styles.footerItemList} key={item.title}>
                  <a href={item.value} target="_blank" rel="noreferrer">{item.title}</a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
