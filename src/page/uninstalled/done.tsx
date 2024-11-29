import styles from "./style.module.css";

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
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <img
          className={styles.logo}
          src="/assets/feedback/logo.svg"
          alt="Rabby"
        />
        <h2 className={styles.title2}>Thank you for your feedback.</h2>

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
          done
        </div>
      </div>
    </div>
  );
};
