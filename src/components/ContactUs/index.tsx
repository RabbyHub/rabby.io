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
    logo: "/assets/contact/medium.svg",
    link: "https://medium.com/@rabby_io",
  },
];

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h2 className="title">Contact Us</h2>
      <div className="card">
        <div className="email-box">
          <h3 className="sub-title">Email</h3>
          <div className="email">
            <div>
              Customer Support:{" "}
              <a href="mailto:support@rabby.io">support@rabby.io</a>
            </div>
            <div>
              Business: <a href="mailto:bd@rabby.io">bd@rabby.io</a>
            </div>
          </div>
        </div>
        <div>
          <h3 className="sub-title">Follow Us</h3>
          <div className="follow-us">
            {followUsList.map((e) => (
              <a href={e.link} target="_blank" rel="noreferrer">
                <img key={e.link} src={e.logo} alt="" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
