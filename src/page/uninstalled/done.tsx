import clsx from "clsx";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";

const list = [
  { src: "/assets/feedback/x.svg", link: "https://x.com/Rabby_io", name: "X" },
  {
    src: "/assets/feedback/discord.svg",
    link: "https://discord.gg/seFBCWmUre",
    name: "Discord",
  },
  {
    src: "/assets/feedback/email.svg",
    link: "mailto:support@rabby.io",
    name: "Email",
  },
];

export const UninstallFeedbackDone = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.container} lang={i18n.resolvedLanguage}>
      <div className={styles.box}>
        <img
          className={clsx(styles.logo, styles.done)}
          src="/assets/feedback/logo.svg"
          alt="Rabby"
        />
        <div className={styles.title2}>{t("thanks")}</div>

        <div className={styles.links}>
          {list.map((item) => {
            return (
              <a
                key={item.src}
                className={styles.link}
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                <img src={item.src} alt={item.name} className={styles.item} />
              </a>
            );
          })}
        </div>

        <div className={styles.submit} onClick={() => window.close()}>
          {t("done")}
        </div>
      </div>
    </div>
  );
};
