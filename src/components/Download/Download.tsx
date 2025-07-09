import styles from './style.module.scss';
import { BROWSER_DOWNLOAD_INFO, DOWNLOAD_INFO_MOBILE, DESKTOP_DOWNLOAD_INFO, DownloadType, MACOS_DOWNLOAD_INFO } from "./download-info";
import { useState, forwardRef } from 'react';

const Download = forwardRef<HTMLDivElement, any>((props, ref) => {
    const [hoverKey, setHoverKey] = useState<string | null>(null);
    const openBrowser = (href: string) => {
        window.open(href, '_blank');
    }
 return <div ref={ref} className={styles.download}>
    <div className={styles.downloadTitle}>Download and get started</div>
    <div className={styles.section}>
        <div className={styles.sectionTitle}>
             <img src="/assets/download/extension.svg"/>
             Extension
         </div>
        <div className={styles.downloadCardList}>
            {Object.entries(BROWSER_DOWNLOAD_INFO).map(([key, value]) => (
                <div key={key} className={styles.downloadItem} onClick={() => openBrowser(value.href)}>
                    <img src={value.icon} alt={value.title}/>
                    <div className={styles.downloadItemTitle}>{value.title}</div>
                </div>
            ))}
        </div>
    </div>
     <div className={styles.sectionGroup}>
         <div className={styles.section}>
             <div className={styles.sectionTitle}>
                 <img src="/assets/download/mobile-2.svg"/>
                 Mobile
             </div>
            <div className={styles.downloadCardList}>
                {Object.entries(DOWNLOAD_INFO_MOBILE).map(([key, value]) => (
                <div
                    key={key}
                    className={styles.downloadItem}
                    onClick={() => openBrowser(value.href)}
                    onMouseEnter={() => setHoverKey(key)}
                    onMouseLeave={() => setHoverKey(null)}
                >
                    {hoverKey === key ? (
                        <img className={styles.downloadItemQrCode} src={value.qrCode} alt={value.title}/>
                    ) : (
                        <>
                            <img src={value.icon} alt={value.title} />
                            <div className={styles.downloadItemTitle}>{value.title}</div>
                        </>
                    )}
                </div>
                ))}
            </div>
         </div>
         <div className={styles.section}>
             <div className={styles.sectionTitle}>
                 <img src="/assets/download/desktop-2.svg"/>
                 Desktop
             </div>
             <div className={styles.downloadCardList}>
                 {Object.entries(DESKTOP_DOWNLOAD_INFO).map(([key, value]) => (
                <div
                    key={key}
                    className={styles.downloadItem}
                    onClick={() => openBrowser(value.href)}
                    onMouseEnter={() => setHoverKey(key)}
                    onMouseLeave={() => setHoverKey(null)}
                >
                    {hoverKey === key && key === "macos" ? (
                        <div className={styles.downloadItemMacos}>
                            {Object.entries(MACOS_DOWNLOAD_INFO).map(([key, value]) => (
                                <div key={key} className={styles.downloadItemMacosItem} onClick={() => openBrowser(value.href)}>
                                    <div className={styles.downloadItemTitleMacos}>{value.title}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <img src={value.icon} alt={value.title} />
                            <div className={styles.downloadItemTitle}>{value.title}</div>
                        </>
                    )}
                </div>
                ))}
            </div>
         </div>
     </div> 
     
  </div>;
});

export default Download;