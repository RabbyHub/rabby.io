import React from 'react';
import { DESKTOP_DOWNLOAD_URL } from './desktop';
import { DownloadButton } from './DownloadButton';
import { JoinDiscord } from './JoinDiscord';
import styles from './style.module.css';
import { Platform, Tab } from './Tab';

const PlatformList = [Platform.WebExtension, Platform.Desktop, Platform.Mobile];

export const Download: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<Platform>(
    Platform.WebExtension
  );

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
            <div className={styles.panelButtonGroup}>
              <div className={styles.panelSingleButton}>
                <DownloadButton
                  title="Download for Chrome"
                  icon="/assets/images/chrome.png"
                  href="https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch"
                  report="Chrome"
                />
              </div>
            </div>
            <JoinDiscord />
          </div>
        )}
        {activeTab === Platform.Mobile && (
          <div className={styles.panel}>
            <div className={styles.empty}>Stay tuned</div>
            <JoinDiscord />
          </div>
        )}
        {activeTab === Platform.Desktop && (
          <div className={styles.panel}>
            <div className={styles.tips}>
              <img src="/assets/download/tips.svg" alt="tip" />
              <span>
                Beta version is available for download (Invitation code
                required)
              </span>
            </div>
            <div className={styles.panelButtonGroup}>
              <DownloadButton
                title="MacOS Intel"
                icon="/assets/download/apple.svg"
                href={DESKTOP_DOWNLOAD_URL.macosIntel}
                report="MacOS Intel"
                size="small"
              />
              <DownloadButton
                title="MacOS M1/M2"
                icon="/assets/download/apple.svg"
                href={DESKTOP_DOWNLOAD_URL.macosArm}
                report="MacOS M1/M2"
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
            <JoinDiscord />
          </div>
        )}
      </div>
    </div>
  );
};