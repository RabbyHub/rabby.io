import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "../cookieConsent.css";
import { ga } from "../ga";

const ANALYTICS_CATEGORY = "analytics";
const PRIVACY_POLICY_URL = "/docs/privacy/";

type CookieConsentBannerProps = {
  onAnalyticsConsentChange: (accepted: boolean) => void;
};

export const CookieConsentBanner = ({
  onAnalyticsConsentChange,
}: CookieConsentBannerProps) => {
  useEffect(() => {
    const syncAnalyticsConsent = () => {
      const accepted = CookieConsent.acceptedCategory(ANALYTICS_CATEGORY);
      ga.setAnalyticsConsent(accepted);
      onAnalyticsConsentChange(accepted);
    };

    ga.setAnalyticsConsent(false);

    CookieConsent.run({
      mode: "opt-in",
      disablePageInteraction: false,
      cookie: {
        name: "rabby_cookie_consent",
        expiresAfterDays: 180,
      },
      guiOptions: {
        consentModal: {
          layout: "box inline",
          position: "bottom right",
          equalWeightButtons: true,
          flipButtons: true,
        },
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        [ANALYTICS_CATEGORY]: {
          autoClear: {
            cookies: [{ name: /^_ga/ }, { name: "_gid" }, { name: /^_gat/ }],
          },
        },
      },
      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              label: "Cookie consent",
              title: "We use cookies to improve your experience.",
              description: `<a href="${PRIVACY_POLICY_URL}" target="_blank" rel="noreferrer">Privacy Policy</a>`,
              acceptAllBtn: "Accept",
              acceptNecessaryBtn: "Reject",
            },
            preferencesModal: {
              title: "Cookie preferences",
              acceptAllBtn: "Accept",
              acceptNecessaryBtn: "Reject",
              savePreferencesBtn: "Save preferences",
              closeIconLabel: "Close",
              sections: [],
            },
          },
        },
      },
      onFirstConsent: syncAnalyticsConsent,
      onConsent: syncAnalyticsConsent,
      onChange: syncAnalyticsConsent,
    }).then(syncAnalyticsConsent);
  }, [onAnalyticsConsentChange]);

  return null;
};
