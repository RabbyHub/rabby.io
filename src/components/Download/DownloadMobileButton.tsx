import React from 'react';
import clsx from 'clsx';
import styles from './style.module.scss';
import { DOWNLOAD_INFO_MOBILE } from './download-info';
import { HoverPopup } from '../HoverPopup';
import { QRCodeSVG } from './QRCodeSVG';

export const DownloadMobileButton: React.FC<{
  className?: string;
}> = ({ className }) => {
  const handleQRClick = (url: string) => {
    window.open(url, '_blank');
  };

  const qrPanel = (
    <div className={styles.qrPanel}>
      <div className={styles.qrRow}>
        {Object.entries(DOWNLOAD_INFO_MOBILE).map(([key, info]) => (
          <div className={styles.qrItem} key={key} onClick={() => handleQRClick(info.href)}>
            <QRCodeSVG 
              href={info.href} 
              icon={info.icon} 
              size={179} 
              iconSize={48}
              className={styles.qrAppIcon}
            />
          </div>
        ))}
      </div>
      <div className={styles.qrArrow}>
        <img src="/assets/images/polygon-2.svg" alt="arrow" />
      </div>
    </div>
  );

  return (
    <HoverPopup
      popup={qrPanel}
      popupClassName={styles.qrPopup}
      offsetY={8}
    >
      {((active: boolean) => (
        <button className={clsx(styles.mobileButton, className, { [styles.active]: active })}>
          <img src="/assets/download/mobile.svg" alt="Mobile" className={styles.mobileIcon} />
          <div className={styles.mobileTitle}>Download for Mobile</div>
        </button>
      )) as any}
    </HoverPopup>
  );
};
