import React, { forwardRef } from "react";
import styles from "./style.module.scss";
import { LINKS, ICONS } from "../../constants/links";

const followUsList = [
  {
    logo: ICONS.SOCIAL.TWITTER,
    link: LINKS.SOCIAL.TWITTER,
  },
  {
    logo: ICONS.SOCIAL.DISCORD,
    link: LINKS.SOCIAL.DISCORD,
  },
  {
    logo: ICONS.SOCIAL.GITHUB,
    link: LINKS.SOCIAL.GITHUB,
  },
  {
    logo: ICONS.SOCIAL.EMAIL,
    link: LINKS.SOCIAL.EMAIL,
  },
  {
    logo: ICONS.SOCIAL.DEBANK,
    link: LINKS.SOCIAL.DEBANK,
  },
];

const ContactUs = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref}>
      <div className="section-title">
        Find Us Here
      </div>
      <div className={styles.contactUs}>
        {followUsList.map((e) => (
          <div className={styles.followUsItem} key={e.link} onClick={() => window.open(e.link, "_blank")}>
            <img src={e.logo} alt={e.link} width={64} height={64} />
          </div>
        ))}
      </div>
    </div>
  );
});

ContactUs.displayName = 'ContactUs';

export default ContactUs;
