import React from 'react';
import clsx from 'clsx';
import styles from './style.module.scss';
import { DownloadType, DOWNLOAD_INFO_MOBILE, MACOS_DOWNLOAD_INFO } from './download-info';
import { HoverPopup } from '../HoverPopup';

export interface DownloadIconProps {
  infoKey: string;
  alt: string;
  src: string;
  title: string;
  href: string;
  type: DownloadType;
  className?: string;
  onClick?: () => void;
  active?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const DownloadIcon: React.FC<DownloadIconProps> = ({
  infoKey,
  alt,
  src,
  title,
  href,
  type,
  className,
  onClick,
  active,
  onMouseEnter,
  onMouseLeave,
}) => {
  const iconContent = (
    <div
      className={clsx(styles.downloadIconWrapper, className)}
      onClick={onClick}
      tabIndex={0}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={src} alt={alt} className={styles.downloadIcon} />
      {active && <span className={styles.iconTitle}>{title}</span>}
    </div>
  );

  if (type === DownloadType.APP) {
    const qrImg = DOWNLOAD_INFO_MOBILE[infoKey as keyof typeof DOWNLOAD_INFO_MOBILE].qrCode;
    return (
      <HoverPopup
        popup={
          qrImg ? (
            <div className={styles.qrImgWrapper}>
              <img
                width={185}
                height={185}
                className={styles.qrImg}
                src={qrImg}
                alt={title}
                />
            </div>
          ) : null
        }
        offsetY={8}
      >
        {iconContent}
      </HoverPopup>
    );
  }

  if (type === DownloadType.DESKTOP && infoKey === 'macos') {
    const macList = (
      <div className={styles.macList}>
        {Object.entries(MACOS_DOWNLOAD_INFO).map(([key, info]) => {
          return (
            <div className={styles.macItem}>
              <a href={info.href} target="_blank">{info.title}</a>
            </div>
          )
        })}
      </div>
    );
    return (
      <HoverPopup
        offsetY={8}
        popup={macList}
      >
        {iconContent}
      </HoverPopup>
    );
  }
  return iconContent;
};

