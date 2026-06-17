import ReactGA4 from "react-ga4";

const GA_MEASUREMENT_ID = "G-H8G6S9KCTX";

let isInitialized = false;
let hasAnalyticsConsent = false;

const setGoogleAnalyticsDisabled = (disabled: boolean) => {
  if (typeof window !== "undefined") {
    (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = disabled;
  }
};

setGoogleAnalyticsDisabled(true);

const initialize = () => {
  if (isInitialized) {
    return;
  }

  ReactGA4.initialize(GA_MEASUREMENT_ID, {
    gtagOptions: {
      send_page_view: false,
    },
  });
  isInitialized = true;
};

const canReport = () => {
  if (!hasAnalyticsConsent) {
    return false;
  }

  initialize();
  return true;
};

export const ga = {
  setAnalyticsConsent: (accepted: boolean) => {
    hasAnalyticsConsent = accepted;
    setGoogleAnalyticsDisabled(!accepted);

    if (accepted) {
      initialize();
    }
  },
  pageview: (path: string) => {
    if (!canReport()) {
      return;
    }

    ReactGA4.send({ hitType: "pageview", path });
  },
  event: (...params: Parameters<typeof ReactGA4.event>) => {
    if (!canReport()) {
      return;
    }

    ReactGA4.event(...params);
  },
};
