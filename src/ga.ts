import ReactGA from 'react-ga';
import ReactGA4 from 'react-ga4';

ReactGA.initialize('UA-199755108-2');
ReactGA4.initialize('G-H8G6S9KCTX');

export const ga = {
  pageview: (path: string) => {
    ReactGA.pageview(path);
    ReactGA4.send({ hitType: 'pageview', path });
  },
  event: (...params: Parameters<typeof ReactGA.event>) => {
    ReactGA.event(...params);
    ReactGA4.event(...params);
  }
};
