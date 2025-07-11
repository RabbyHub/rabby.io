import React from "react";
import styles from "./style.module.scss";
const Footer = () => {
  const footerList = [
    {
      sectionTitle: "Contact Us",
      items: [
      {
        title: "X",
        value: "https://twitter.com/Rabby_io",
      },
      {
        title: "Github",
        value: "https://github.com/RabbyHub/Rabby",
      },
      {
        title: "Discord",
        value: "https://discord.gg/seFBCWmUre",
      },
      {
        title: "Email",
        value: "rabby.io@gmail.com",
      },
      {
        title: "Debank",
        value: "https://debank.com/hi/0a110032",
      }
    ]},
    {
      sectionTitle: "Download",
      items: [
        {
          title: "Chrome",
          value: "https://chromewebstore.google.com/detail/rabby-wallet/eimadpbcbfnmbkopoojfekhnkhdbieeh",
        },
        {
          title: "iOS",
          value: "https://apps.apple.com/us/app/rabby-wallet/id1564649197",
        },
        {
          title: "Android",
          value: "https://play.google.com/store/apps/details?id=io.rabby.wallet",
        },
        {
          title: "Mac",
          value: "https://rabby.io/download/mac",
        },
        {
          title: "Windows",
          value: "https://rabby.io/download/windows",
        },
      ]
    },
    {
      sectionTitle: "Support",
      items: [
        {
          title: "Help Center",
          value: "https://rabby.io/help",
        },
        {
          title: "Rabby Kit",
          value: "https://rabby.io/knowledge-base",
        },
        {
          title: "Integrated Doc",
          value: "https://rabby.io/docs",
        },
        {
          title: "Chain Dashboard",
          value: "https://rabby.io/chain-dashboard",
          
        }
      ]
    },
    {
      sectionTitle: "Security",
      items: [
        {
          title: "Audit by SlowMist",
          value: "https://github.com/RabbyHub/Rabby/blob/develop/docs/Rabby%20Browser%20Extension%20Wallet%20-%20SlowMist%20Audit%20Report-20241217.pdf",
        },
        {
          title: "Audit by Least Authority",
          value: "https://github.com/RabbyHub/Rabby/blob/develop/docs/Least%20Authority%20-%20DeBank%20Rabby%20Wallet%20Extension%20Final%20Audit%20Report-20241212.pdf",
        },
        {
          title: "Open Source",
          value: "https://rabby.io/about-us",
        },
        {
          title: "Terms of Use",
          value: "/docs/terms-of-use/",
        },
        {
          title: "Privacy Policy",
          value: "/docs/privacy/",
        }
      ]
    },
  ]
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
