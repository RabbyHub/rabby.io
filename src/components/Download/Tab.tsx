import clsx from "clsx";
import React from "react";
import styles from "./style.module.scss";
import { IsFirefox } from "../../constant";

export enum Platform {
  WebExtension = "WebExtension",
  Desktop = "Desktop",
  Mobile = "Mobile",
}

const PlatformInfo = {
  [Platform.Desktop]: {
    title: "Desktop",
    status: "Released",
    icon: "/assets/download/desktop.svg",
  },
  [Platform.Mobile]: {
    title: "Mobile",
    status: "beta",
    icon: "/assets/download/mobile.svg",
    isBeta: true,
  },
  [Platform.WebExtension]: {
    title: "Extension",
    status: "Released",
    icon: "/assets/download/extension-1.svg",
  },
};

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  platform: Platform;
  active?: boolean;
}

export const Tab: React.FC<Props> = ({ platform, active, ...attrs }) => {
  const { title, status, icon } = PlatformInfo[platform];
  return (
    <div
      {...attrs}
      className={clsx(
        styles.tab,
        {
          [styles.active]: active,
          [styles.hasTag]: status === "beta",
        },
        `tab-${platform}`
      )}
    >
      <img className={styles.icon} src={icon} alt={title} />
      <div className={styles.info}>
        <h3>
          <span className={styles.text}>{title}</span>
          {status === "beta" ? <div className={styles.tag}>Beta</div> : null}
        </h3>
      </div>
      {active && (
        <div className={styles.activeIcon}>
          <img src="/assets/download/arrow.svg" alt="arrow" />
        </div>
      )}
    </div>
  );
};
