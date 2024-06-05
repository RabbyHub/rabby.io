import clsx from "clsx";
import React from "react";
import { useLocation } from "react-router-dom";
import { DESKTOP_DOWNLOAD_URL } from "./desktop";
import { DownloadButton } from "./DownloadButton";
import { JoinDiscord } from "./JoinDiscord";
import styles from "./style.module.scss";
import { Platform, Tab } from "./Tab";
import { DownloadCard } from "./DownloadCard";
import { MOBILE_DOWNLOAD_URL } from "./mobile";

const PlatformList = [Platform.WebExtension, Platform.Desktop, Platform.Mobile];

export const Download: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState<Platform>(
    Platform.WebExtension
  );

  React.useEffect(() => {
    const query = new URLSearchParams(location.search);
    const platform = query.get("platform");

    if (platform === "desktop") {
      setActiveTab(Platform.Desktop);
    } else if (platform === "mobile") {
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
          <>
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
            <JoinDiscord href="https://discord.gg/seFBCWmUre" />
          </>
        )}
        {activeTab === Platform.Mobile && (
          <>
            <div className={styles.panel}>
              <div
                className={clsx(
                  styles.panelButtonGroup,
                  styles.panelButtonGroupApp
                )}
              >
                <DownloadCard
                  title="Google Play"
                  icon="/assets/download/icon-google-play.png"
                  iconClassName={styles.downloadIconGooglePlay}
                  href={MOBILE_DOWNLOAD_URL.googlePlay}
                  report="Google Play"
                />
                {/* <DownloadCard
                  title="Android APK"
                  icon="/assets/download/icon-android-apk.svg"
                  href={MOBILE_DOWNLOAD_URL.selfHost}
                  report="Android APK"
                /> */}
                <DownloadCard
                  title="App Store"
                  icon="/assets/download/icon-app-store.png"
                  href="https://apps.apple.com/us/app/rabby-wallet-crypto-evm/id6474381673"
                  report="App Store"
                />
              </div>
            </div>
            <JoinDiscord href="https://discord.gg/AvYmaTjrBu" />
          </>
        )}
        {activeTab === Platform.Desktop && (
          <>
            <div className={styles.panel}>
              <div className={styles.tips}>
                <span>Supported on MacOs11+ and Windows 10+</span>
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
            <JoinDiscord href="https://discord.gg/aDpDE7DNQe" />
          </>
        )}
      </div>
    </div>
  );
};
