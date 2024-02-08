import React from "react";
import styles from "./style.module.scss";

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const JoinDiscord: React.FC<Props> = (attrs) => {
  return (
    <a target="_blank" className={styles.discord} rel="noreferrer" {...attrs}>
      <img src="/assets/images/discord.png" alt="" className="icon-discord" />
      <span>Join the discussion in Discord</span>
    </a>
  );
};
