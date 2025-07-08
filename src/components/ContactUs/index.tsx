import styles from "./style.module.scss";
const followUsList = [
  {
    logo: "/assets/contact/x.svg",
    link: "https://twitter.com/Rabby_io",
  },
  {
    logo: "/assets/contact/discord.svg",
    link: "https://discord.gg/seFBCWmUre",
  },
  {
    logo: "/assets/contact/github.svg",
    link: "https://github.com/RabbyHub/Rabby",
  },
  {
    logo: "/assets/contact/gmail.svg",
    link: "mailto:rabby.io@gmail.com",
  },
  {
    logo: "/assets/contact/debank.svg",
    link: "https://debank.com/hi/0a110032",
  },
];

const ContactUs = () => {
  return (
    <div className={styles.contactUs}>
      {followUsList.map((e) => (
        <div className={styles.followUsItem} key={e.link} onClick={() => window.open(e.link, "_blank")}>
          <img src={e.logo} alt={e.link} width={64} height={64} />
        </div>
      ))}
    </div>
  );
};

export default ContactUs;
