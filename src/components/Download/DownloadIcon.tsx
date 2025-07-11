import React from 'react';
import clsx from 'clsx';
import styles from './style.module.scss';
import { DownloadType, DOWNLOAD_INFO_MOBILE, MACOS_DOWNLOAD_INFO } from './download-info';
import { HoverPopup } from '../HoverPopup';
import { showToast } from '../../toast';

export interface DownloadIconProps {
  infoKey: string;
  alt: string;
  src: string;
  title: string;
  href: string;
  type: DownloadType;
  className?: string;
  onClick?: () => void;
  active?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  disableHover?: boolean;
}

export const DownloadIcon: React.FC<DownloadIconProps> = ({
  infoKey,
  alt,
  src,
  title,
  href,
  type,
  className,
  onClick,
  active: _active,
  onMouseEnter,
  onMouseLeave,
  disableHover = false,
}) => {
  // 检测是否为移动端
  const isMobile = /mobile/i.test(navigator.userAgent);
  
  // 处理点击事件
  const handleClick = () => {
    // 如果是移动端且是插件或桌面版，则显示提示
    if (isMobile && (type === DownloadType.BROWSER || type === DownloadType.DESKTOP)) {
      showToast({
        content: 'Please visit this site from the desktop to download',
        duration: 2000
      });
      return;
    }
    
    // 如果有自定义的onClick回调，优先使用
    if (onClick) {
      onClick();
      return;
    }
    
    // 否则跳转到对应的链接
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };
  const renderIconContent = (active: boolean) => (
    <div
      className={clsx(styles.downloadIconWrapper, className, { [styles.active]: active })}
      onClick={handleClick}
      tabIndex={0}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={src} alt={alt} className={styles.downloadIcon}/>
      {active && <span className={styles.iconTitle}>{title}</span>}
    </div>
  );

  if (disableHover) {
    // 不渲染HoverPopup，直接渲染icon内容且无hover高亮
    return renderIconContent(false);
  }

  if (type === DownloadType.APP) {
    const qrImg = DOWNLOAD_INFO_MOBILE[infoKey as keyof typeof DOWNLOAD_INFO_MOBILE].qrCode;
    return (
      <HoverPopup
        popup={
          qrImg ? (
            <div className={styles.qrImgWrapper}>
              <img
                width={185}
                height={185}
                className={styles.qrImg}
                src={qrImg}
                alt={title}
              />
              <img src="/assets/images/polygon-2.svg" alt="arrow" className={styles.qrArrow}/>
            </div>
          ) : null
        }
        offsetY={8}
      >
        {(active: boolean) => renderIconContent(active)}
      </HoverPopup>
    );
  }

  if (type === DownloadType.DESKTOP && infoKey === 'macos') {
    const macList = (
      <div className={styles.macList}>
        {Object.entries(MACOS_DOWNLOAD_INFO).map(([key, info]) => {
          return (
            <div className={styles.macItem} key={key}>
              <a href={info.href} target="_blank">{info.title}</a>
            </div>
          )
        })}
        <img src="/assets/images/polygon-2.svg" alt="arrow" className={styles.qrArrow}/>
      </div>
    );
    return (
      <HoverPopup
        offsetY={8}
        popup={macList}
      >
        {(active: boolean) => renderIconContent(active)}
      </HoverPopup>
    );
  }
  return renderIconContent(!!_active);
};

