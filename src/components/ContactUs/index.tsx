import React, { forwardRef } from "react";
import styles from "./style.module.scss";
import { LINKS, ICONS, EMAIL_LIST } from "../../constants/links";
import { useIsSmallScreen } from "../../hooks/useIsSmallScreen";
import { HoverPopup } from "../HoverPopup";
import clsx from "clsx";

const followUsList = [
  {
    name: 'Twitter',
    logo: ICONS.SOCIAL.TWITTER,
    link: LINKS.SOCIAL.TWITTER,
  },
  {
    name: 'Discord',
    logo: ICONS.SOCIAL.DISCORD,
    link: LINKS.SOCIAL.DISCORD,
  },
  {
    name: 'Github',
    logo: ICONS.SOCIAL.GITHUB,
    link: LINKS.SOCIAL.GITHUB,
  },
  {
    name: 'Email',
    logo: ICONS.SOCIAL.EMAIL,
  },
  {
    name: 'DeBank',
    logo: ICONS.SOCIAL.DEBANK,
    link: LINKS.SOCIAL.DEBANK,
  },
];

const ContactUs = forwardRef<HTMLDivElement>((props, ref) => {
  const isSmallScreen = useIsSmallScreen();

  return (
    <div ref={ref}>
      <div className="section-title">
        Find Us Here
      </div>
      <div className={styles.contactUs}>
        {followUsList.map((e) => (
          e.name === 'Email' ? (
            isSmallScreen ? (
              <HoverPopup
                key={e.name}
                popupClassName={styles.emailPopup}
                offsetY={8}
                popup={
                  <div className={styles.emailPopupContainer}>
                    <div className={styles.emailPopupContent}>
                      {EMAIL_LIST.map((email) => (
                        <a
                          key={email.name}
                          href={email.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.emailPopupItem}
                        >
                          {email.name}
                        </a>
                      ))}
                    </div>
                    <img src="/assets/images/polygon-2.svg" alt="arrow" />
                  </div>
                }
              >
                <div className={styles.followUsItem}>
                  <img src={e.logo} alt={e.name} width={64} height={64} />
                </div>
              </HoverPopup>
            ) : (
              <div className={clsx(styles.followUsItem, styles.emailList)} key={e.name}>
                <img src={e.logo} alt={e.link} width={64} height={64} className={styles.emailLogo}/>
                <div className={styles.emailListText}>
                {EMAIL_LIST.map((email) => (
                    <a key={email.name} href={email.link} target="_blank" rel="noopener noreferrer">{email.name}</a>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className={styles.followUsItem} key={e.link} onClick={() => window.open(e.link, "_blank")}>
              <img src={e.logo} alt={e.link} width={64} height={64} />
            </div>
          )
        ))}
      </div>
    </div>
  );
});

ContactUs.displayName = 'ContactUs';

export default ContactUs;
