import styles from './style.module.scss';
import { BROWSER_DOWNLOAD_INFO, DOWNLOAD_INFO_MOBILE, DESKTOP_DOWNLOAD_INFO, MACOS_DOWNLOAD_INFO } from "./download-info";
import { useState, forwardRef } from 'react';
import { useIsSmallScreen } from '../../hooks/useIsSmallScreen';
import { showToast } from '../../toast';
import { QRCodeSVG } from './QRCodeSVG';

const Download = forwardRef<HTMLDivElement, any>((props, ref) => {
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const isSmallScreen = useIsSmallScreen();
  
  // 检测是否为移动端
  const isMobile = /mobile/i.test(navigator.userAgent);

  const openBrowser = (href: string, type?: string) => {
    // 如果是移动端且是插件或桌面版，则显示提示
    if (isMobile && (type === 'extension' || type === 'desktop')) {
      showToast({
        content: 'Please visit this site from the desktop to download',
        duration: 2000
      });
      return;
    }
    
    window.open(href, '_blank');
  };

  const renderItem = (key: string, value: any, type?: string) => (
    <div key={key} className={styles.downloadItem} onClick={() => openBrowser(value.href, type)}>
      <img src={value.icon} alt={value.title} />
      <div className={styles.downloadItemTitle}>{value.title}</div>
    </div>
  );

  return (
    <div ref={ref} className={styles.download}>
      <div className={styles.downloadTitle}>Download and get started</div>
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          <img src="/assets/download/extension.svg" alt="Extension" />
          Extension
        </div>
        <div className={styles.downloadCardList}>
          {Object.entries(BROWSER_DOWNLOAD_INFO).map(([key, value]) => renderItem(key, value, 'extension'))}
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
                onClick={() => openBrowser(value.href, 'mobile')}
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
                  renderItem(key, value)
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
                onClick={() => openBrowser(value.href, 'desktop')}
                onMouseEnter={() => { if (!isSmallScreen) setHoverKey(key); }}
                onMouseLeave={() => { if (!isSmallScreen) setHoverKey(null); }}
              >
                {(hoverKey === key && key === "macos") ? (
                  <div className={styles.downloadItemMacos}>
                    {Object.entries(MACOS_DOWNLOAD_INFO).map(([macKey, macValue]) => (
                      <div
                        key={macKey}
                        className={styles.downloadItemMacosItem}
                        onClick={() => openBrowser(macValue.href, 'desktop')}
                      >
                        <div className={styles.downloadItemMacosItemTitleMacos}>{macValue.title}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  renderItem(key, value)
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