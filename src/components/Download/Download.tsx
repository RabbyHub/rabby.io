import styles from './style.module.scss';
import { BROWSER_DOWNLOAD_INFO, DOWNLOAD_INFO_MOBILE, DESKTOP_DOWNLOAD_INFO, MACOS_DOWNLOAD_INFO, DownloadType } from "./download-info";
import { useState, forwardRef } from 'react';
import { useIsSmallScreen } from '../../hooks/useIsSmallScreen';
import { showToast } from '../../toast';
import { QRCodeSVG } from './QRCodeSVG';
import { ga } from '../../ga';

const Download = forwardRef<HTMLDivElement, any>((props, ref) => {
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const isSmallScreen = useIsSmallScreen();
  
  // 检测是否为移动端
  const isMobile = /mobile/i.test(navigator.userAgent);
  const reportClickDownload = (report: string) => {
    ga.event({
      category: 'User',
      action: 'clickDownload',
      label: report
    });
  };
  const openBrowser = (href: string, type: DownloadType, title: string) => {
    // 如果是移动端且是浏览器扩展或桌面版，则显示提示
    if (isMobile && (type === DownloadType.BROWSER || type === DownloadType.DESKTOP)) {
      showToast({
        content: 'Please visit this site from the desktop to download',
        duration: 2000
      });
      return;
    }
    reportClickDownload(title);
    window.open(href, '_blank');
  };

  const renderItem = (key: string, value: any, type: DownloadType) => (
    <div key={key} className={styles.downloadItem} onClick={() => openBrowser(value.href, type, value.title)}>
      <img src={value.icon} alt={value.title} />
      <div className={styles.downloadItemTitle}>{value.title}</div>
    </div>
  );

  return (
    <div ref={ref} className={styles.download}>
      <div className={styles.downloadTitle}>Get Started with Rabby Wallet</div>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <img src="/assets/download/extension-new.svg" alt="Extension" />
          Extension
        </div>
        <div className={styles.downloadCardList}>
          {Object.entries(BROWSER_DOWNLOAD_INFO).map(([key, value]) => renderItem(key, value, DownloadType.BROWSER))}
        </div>
      </div>
      <div className={styles.sectionGroup}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <img src="/assets/download/mobile-2.svg" alt="Mobile" />
            Mobile
          </div>
          <div className={styles.downloadCardList}>
            {Object.entries(DOWNLOAD_INFO_MOBILE).map(([key, value]) => (
              <div
                key={key}
                className={styles.downloadItem}
                onClick={() => openBrowser(value.href, DownloadType.APP, value.title)}
                onMouseEnter={() => { if (!isSmallScreen) setHoverKey(key); }}
                onMouseLeave={() => { if (!isSmallScreen) setHoverKey(null); }}
              >
                {hoverKey === key ? (
                  <QRCodeSVG 
                    href={value.href} 
                    icon={value.icon} 
                    size={165} 
                    iconSize={40}
                  />
                ) : (
                  renderItem(key, value, DownloadType.APP)
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            <img src="/assets/download/desktop-2.svg" alt="Desktop" />
            Desktop
          </div>
          <div className={styles.downloadCardList}>
            {Object.entries(DESKTOP_DOWNLOAD_INFO).map(([key, value]) => (
              <div
                key={key}
                className={styles.downloadItem}
                onMouseEnter={() => { if (!isSmallScreen) setHoverKey(key); }}
                onMouseLeave={() => { if (!isSmallScreen) setHoverKey(null); }}
              >
                {(hoverKey === key && key === "macos") ? (
                  <div className={styles.downloadItemMacos}>
                    {Object.entries(MACOS_DOWNLOAD_INFO).map(([macKey, macValue]) => (
                      <a key={macKey}
                        onClick={(e) => {
                          e.preventDefault();
                          reportClickDownload(macValue.title);
                          window.open(macValue.href, '_blank');
                        }}
                        href={macValue.href}
                        target="_blank"
                        className={styles.downloadItemMacosItem}
                      >
                        {macValue.title}
                      </a>
                    ))}
                  </div>
                ) : (
                  renderItem(key, value, DownloadType.DESKTOP)
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Download;