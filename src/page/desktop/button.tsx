import clsx from 'clsx';
import React from 'react';
import styles from './style.module.css';

export interface Props {
  icon: string;
  children: string;
  isComingSoon?: boolean;
  href?: string;
}

export const Button: React.FC<Props> = ({
  children,
  icon,
  isComingSoon,
  href
}) => {
  return (
    <a href={href} className={styles.buttonLink}>
      <button
        className={clsx(styles.button, {
          [styles['is-coming-soon']]: isComingSoon
        })}
      >
        <img src={icon} alt={children} />
        <span>{children}</span>
      </button>
    </a>
  );
};
