import React from 'react';
import clsx from 'clsx';
import styles from './style.module.scss';
import { DOWNLOAD_INFO_MOBILE } from './download-info';
import { HoverPopup } from '../HoverPopup';
import { QRCodeSVG } from './QRCodeSVG';
import { ga } from '../../ga';

export const DownloadMobileButton: React.FC<{
  className?: string;
}> = ({ className }) => {
  const handleQRClick = (url: string, title: string) => {
    window.open(url, '_blank');
    reportClickDownload(title);
  };

  const reportClickDownload = (report: string) => {
    ga.event({
      category: 'User',
      action: 'clickDownload',
      label: report
    });
  };

  const qrPanel = (
    <div className={styles.qrPanel}>
      <div className={styles.qrRow}>
        {Object.entries(DOWNLOAD_INFO_MOBILE).map(([key, info]) => (
          <div className={styles.qrItem} key={key} onClick={() => handleQRClick(info.href, info.title)}>
            <div className={styles.qrItemContent}>
              <img className={styles.qrTipsIcon} src="/assets/download/qr-code.svg" alt="qr-code" />
              <div className={styles.foldTriangle}></div>
              <img src={info.icon} alt={info.title} />
              <div className={styles.qrItemTitle}>{info.title}</div>
            </div>
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
