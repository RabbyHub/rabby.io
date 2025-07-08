import clsx from "clsx";
import { QRCodeSVG } from "qrcode.react";
import React, { useRef, useState } from "react";
import { ga } from "../../ga";
import styles from "./style.module.scss";
import { BROWSER_DOWNLOAD_INFO, DOWNLOAD_INFO_MOBILE, DOWNLOAD_INFO } from "./download-info";


export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  icon: string;
  title: string;
  href: string;
  report?: string;
  iconClassName?: string;
}

export const DownloadCard: React.FC<Props> = ({
  icon,
  title,
  className,
  iconClassName,
  href,
  report
}) => {

  const reportClickDownload = (e: React.MouseEvent) => {
    ga.event({
      category: "User",
      action: "clickDownload",
      label: report,
    });
  };

  return (
    <a
      className={clsx(
        styles.downloadCard,
        className
      )}
      href={href}
      rel="noreferrer"
      onClick={reportClickDownload}
      target="_blank"
    >
      <div className={styles.appStore}>
        <img src={icon} alt={title} className={clsx(iconClassName, styles.appStoreImage)} />
        <div className={styles.appStoreTitle}>{title}</div>
        <div
          className={clsx(styles.appStoreTitle, styles.appStoreTitleDisabled)}
        >
          Under review
        </div>
      </div>
      <div className={styles.qrCode}>
        <div className={styles.qrCodeImageWrap}>
          <QRCodeSVG value={href} className={styles.qrCodeImage} />
        </div>
      </div>
      <div className={styles.toggleBtn}>
        <img src="/assets/download/icon-qr-code.svg" alt="" />
      </div>
    </a>
  );
};
