import clsx from "clsx";
import { QRCodeSVG } from "qrcode.react";
import React, { useRef, useState } from "react";
import { ga } from "../../ga";
import styles from "./style.module.scss";

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  icon: string;
  title: string;
  href: string;
  report?: string;
  isDisabled?: boolean;
  iconClassName?: string;
}

export const DownloadCard: React.FC<Props> = ({
  icon,
  title,
  className,
  iconClassName,
  href,
  report,
  isDisabled,
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const reportClickDownload = (e: React.MouseEvent) => {
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      if (/mobile/i.test(navigator.userAgent)) {
        setIsClicked(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setIsClicked(false);
        }, 2000);
      }
      return;
    }
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
        isDisabled && styles.isDisabled,
        isClicked && styles.isClicked
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
