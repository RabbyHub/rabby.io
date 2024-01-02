import clsx from 'clsx';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { DESKTOP_DOWNLOAD_URL } from './desktop';
import { DownloadButton } from './DownloadButton';
import { JoinDiscord } from './JoinDiscord';
import styles from './style.module.css';
import { Platform, Tab } from './Tab';

const PlatformList = [Platform.WebExtension, Platform.Desktop, Platform.Mobile];

export const Download: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState<Platform>(
    Platform.WebExtension
  );

  React.useEffect(() => {
    const query = new URLSearchParams(location.search);
    const platform = query.get('platform');

    if (platform === 'desktop') {
      setActiveTab(Platform.Desktop);
    } else if (platform === 'mobile') {
      setActiveTab(Platform.Mobile);
    } else {
      setActiveTab(Platform.WebExtension);
    }
  }, [location]);

  return (
    <div className={styles.download}>
      <div className={styles.tabs}>
        {PlatformList.map((platform) => (
          <Tab
            key={platform}
            platform={platform}
            active={platform === activeTab}
            onClick={() => setActiveTab(platform)}
          />
        ))}
      </div>

      <div className={styles.panels}>
        {activeTab === Platform.WebExtension && (
          <div className={styles.panel}>
            <div
              className={clsx(
                styles.panelButtonGroup,
                styles.panelSingleButton
              )}
            >
              <DownloadButton
                title="Download for Chrome"
                icon="/assets/images/chrome.png"
                href="https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch"
                report="Chrome"
              />
            </div>
          </div>
        )}
        {activeTab === Platform.Mobile && (
          <div className={styles.panel}>
            <div className={clsx(styles.empty, styles.panelButtonGroup)}>
              Stay tuned
            </div>
          </div>
        )}
        {activeTab === Platform.Desktop && (
          <div className={styles.panel}>
            <div className={styles.tips}>
              <img src="/assets/download/tips.svg" alt="tip" />
              <span>
                Support MacOS 11+ and Windows 10+
              </span>
            </div>
            <div className={styles.panelButtonGroup}>
              <DownloadButton
                title="macOS Intel"
                icon="/assets/download/apple.svg"
                href={DESKTOP_DOWNLOAD_URL.macosIntel}
                report="MacOS Intel"
                size="small"
              />
              <DownloadButton
                title="macOS M-Series"
                icon="/assets/download/apple.svg"
                href={DESKTOP_DOWNLOAD_URL.macosArm}
                report="MacOS M-Series"
                size="small"
              />
              <DownloadButton
                title="Windows"
                icon="/assets/download/windows.svg"
                href={DESKTOP_DOWNLOAD_URL.windows}
                report="Windows"
                size="small"
              />
            </div>
          </div>
        )}

        <JoinDiscord />
      </div>
    </div>
  );
};
