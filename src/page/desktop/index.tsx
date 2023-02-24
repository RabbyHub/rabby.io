import React from 'react';
import { Button } from './button';
import styles from './style.module.css';

export const DesktopPage = () => {
  return (
    <main className={styles.container}>
      <section className={styles.panel}>
        <div className={styles.hero}>
          <h1 className={styles.headline}>
            Welcome to the Rabby Desktop beta.
            <br />
            Download now to get early-access to Rabby Desktop
          </h1>
        </div>
        <div className={styles.banner}>
          <img src="/assets/desktop/laptop.svg" alt="laptop" />
        </div>
        <div className={styles.download}>
          <Button icon="/assets/desktop/macos.svg">macOS Intel</Button>
          <Button icon="/assets/desktop/macos.svg">macOS Apple Silicon</Button>
          <Button icon="/assets/desktop/win.svg" isComingSoon>
            Windows
          </Button>
        </div>
      </section>
    </main>
  );
};
