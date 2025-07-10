import React, { useState } from "react";
import styles from "./Download/style.module.scss";
import { DownloadButton } from "./Download/DownloadButton";
import { DOWNLOAD_INFO, BROWSER_DOWNLOAD_INFO, DownloadType, DOWNLOAD_INFO_MOBILE } from "./Download/download-info";
import { DownloadIcon } from "./Download/DownloadIcon";
import { DownloadMobileButton } from "./Download/DownloadMobileButton";
import { useIsSmallScreen } from "../hooks/useIsSmallScreen";
import clsx from "clsx";

// 浏览器检测函数
const detectBrowser = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/brave/i.test(userAgent)) {
    return 'brave';
  } else if (/edg\//i.test(userAgent)) {
    return 'edge';
  }
  return 'chrome';
};

const detectMobileOS = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/android/i.test(userAgent)) {
    return 'googlePlay';
  }
  return 'appStore';
};

export const Main: React.FC = () => {
    const isSmallScreen = useIsSmallScreen();
    const currentBrowser = detectBrowser();
    const browserInfo = BROWSER_DOWNLOAD_INFO[currentBrowser as keyof typeof BROWSER_DOWNLOAD_INFO];
    const currentMobile = detectMobileOS();
    const [activeKey, setActiveKey] = useState<string | null>(null);

    return (
    <div className={styles.main}>
        <div className={styles.buttonGroup}>
                {isSmallScreen ? (
                    <button className={clsx("round-button primary", styles.downloadMobileButtonSmall)} onClick={() => {
                        window.open(currentMobile === 'googlePlay' ? DOWNLOAD_INFO_MOBILE.googlePlay.href : DOWNLOAD_INFO_MOBILE.appStore.href, '_blank');
                    }}>
                        <img src={currentMobile === 'googlePlay' ? '/assets/download/google-play-blue.svg' : '/assets/download/apple-store-blue.svg'}/>
                        <div>Download for {currentMobile === 'googlePlay' ? 'Android' : 'iOS'}</div>
                    </button>
                ) : (
                        <>
                    <DownloadButton
                    className={clsx( "round-button primary", styles.downloadBrowserButton)}
                    title={`Download for ${browserInfo.title}`}
                    icon={browserInfo.icon}
                    href={browserInfo.href}
                    report={browserInfo.title}
                />
                    <DownloadMobileButton className={styles.downloadMobileButton} />
                </>
            )} 
        </div>
        <div className={styles.downloadTips}>
            Also available on other browsers and devices
        </div>
        <div className={styles.downloadList}>
            {Object.entries(DOWNLOAD_INFO).map(([key, info]) => {
                if (isSmallScreen) {
                    if (info.type === DownloadType.APP && key === currentMobile) {
                        return null;
                    }
                } else {
                    if (info.type === DownloadType.BROWSER && key === currentBrowser) {
                        return null;
                    }   
                }

                return (
                    <DownloadIcon
                        key={key}
                        infoKey={key}
                        title={info.title}
                        src={info.icon}
                        alt={info.title}
                        href={info.href}
                        type={info.type}
                        className={styles.downloadIcon}
                        active={activeKey === key}
                        onMouseEnter={() => setActiveKey(key)}
                        onMouseLeave={() => setActiveKey(null)}
                        disableHover={isSmallScreen}
                    />
                );
            })}
        </div>
    </div>
    )
}