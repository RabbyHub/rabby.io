import ReactGA4 from "react-ga4";

ReactGA4.initialize("G-H8G6S9KCTX");

export const ga = {
  pageview: (path: string) => {
    ReactGA4.send({ hitType: "pageview", path });
  },
  event: (...params: Parameters<typeof ReactGA4.event>) => {
    ReactGA4.event(...params);
  },
};
