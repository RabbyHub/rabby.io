import clsx from 'clsx';
import React from 'react';
import styles from './style.module.scss';
import { showToast } from '../../toast';
import { ga } from '../../ga';

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  icon: string;
  title: string;
  href: string;
  report?: string;
  size?: 'small' | 'medium' | 'large';
}

export const DownloadButton: React.FC<Props> = ({
  icon,
  title,
  className,
  href,
  report,
  size = 'medium',
  ...props
}) => {
  const reportClickDownload = (e: React.MouseEvent) => {
    if (/mobile/i.test(navigator.userAgent)) {
      e.preventDefault();
      showToast({
        content: 'Please visit this site from the desktop',
        duration: 2000
      });
    }

    ga.event({
      category: 'User',
      action: 'clickDownload',
      label: report
    });
  };

  return (
    <a
      className={styles.buttonLink}
      href={href}
      rel="noreferrer"
      onClick={reportClickDownload}
      target="_blank"
    >
      <button
        className={clsx(className, styles.button, {
          [styles.small]: size === 'small',
          [styles.medium]: size === 'medium',
          [styles.large]: size === 'large'
        })}
        {...props}
      >
        <img src={icon} alt={title} />
        <span>{title}</span>
      </button>
    </a>
  );
};
