import clsx from 'clsx';
import React from 'react';
import styles from './style.module.css';
import ReactGA from 'react-ga';

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
  const reportClickDownload = () => {
    ReactGA.event({
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
