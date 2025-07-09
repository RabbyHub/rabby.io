import React, { useState } from "react";
import styles from "./Download/style.module.scss";
import { DownloadButton } from "./Download/DownloadButton";
import { DOWNLOAD_INFO, BROWSER_DOWNLOAD_INFO, DownloadType } from "./Download/download-info";
import { DownloadIcon } from "./Download/DownloadIcon";
import { DownloadMobileButton } from "./Download/DownloadMobileButton";
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

export const Main: React.FC = () => {
    const currentBrowser = detectBrowser();
    const browserInfo = BROWSER_DOWNLOAD_INFO[currentBrowser as keyof typeof BROWSER_DOWNLOAD_INFO];
    const [activeKey, setActiveKey] = useState<string | null>(null);

    return (
    <div className={styles.main}>
        <div className={styles.buttonGroup}>
            <DownloadButton
                className={clsx( "round-button primary", styles.downloadBrowserButton)}
                title={`Download for ${browserInfo.title}`}
                icon={browserInfo.icon}
                href={browserInfo.href}
                report={browserInfo.title}
            />
            <DownloadMobileButton />
        </div>
        <div className={styles.downloadTips}>
            Also available on other browsers and devices
        </div>
        <div className={styles.downloadList}>
            {Object.entries(DOWNLOAD_INFO).map(([key, info]) => {
                if (info.type === DownloadType.BROWSER && key === currentBrowser) {
                    return null;
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
                    />
                );
            })}
        </div>
    </div>
    )
}