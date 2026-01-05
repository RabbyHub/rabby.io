const path = require("path");

module.exports = {
  base: "/docs/",
  title: "Debank & Rabby",
  description: "Document for Rabby",
  nextLinks: false,
  prevLinks: false,
  dest: path.resolve(__dirname, "../../dist/docs"),
  themeConfig: {
    logo: "/debank-512.png",
    navbar: false,
  },

  head: [
    [
      "link",
      { rel: "icon", href: `https://rabby.io/assets/images/favicon.png` },
    ],
    [
      "meta",
      {
        "http-equiv": "Content-Security-Policy",
        content:
          "default-src 'self'; script-src 'self'" +
          (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "") +
          "; style-src 'self' 'unsafe-inline'; img-src https://*; child-src 'none'",
      },
    ],
  ],
};
