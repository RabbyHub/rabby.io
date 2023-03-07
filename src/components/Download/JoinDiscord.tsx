import React from 'react';
import styles from './style.module.css';

export const JoinDiscord: React.FC<React.HTMLAttributes<HTMLAnchorElement>> = (
  attrs
) => {
  return (
    <a
      href="https://discord.gg/seFBCWmUre"
      target="_blank"
      className={styles.discord}
      rel="noreferrer"
      {...attrs}
    >
      <img src="/assets/images/discord.png" alt="" className="icon-discord" />
      <span>Join the discussion in Discord</span>
    </a>
  );
};
