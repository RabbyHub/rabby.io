import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./style.module.css";
import { useSearchParams } from "react-router-dom";
import { UninstallFeedbackDone } from "./done";
import clsx from "clsx";
import { ga } from "../../ga";
import { useMutation } from "react-query";
import { apiReady } from "../../service";
import toast, { Toaster } from "react-hot-toast";
import i18n, { getSupportedLanguageCode } from "../../i18n";
import { useTranslation } from "react-i18next";

const reasonKeys = [
  "issues",
  "missing",
  "reinstalling",
  "noLongerNeeded",
  "other",
] as const;
type ReasonKey = (typeof reasonKeys)[number];
const reasonsWithoutDetails: ReasonKey[] = ["reinstalling", "noLongerNeeded"];

export const Uninstalled = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "page.uninstalled",
  });
  const [reason, setReason] = useState<ReasonKey | "">("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const [search] = useSearchParams();

  const r = useMemo(() => search.get("r") || "", [search]);
  const version = useMemo(() => search.get("v") || "", [search]);
  const languageCode = useMemo(
    () => getSupportedLanguageCode(search.get("lang")),
    [search]
  );

  const sendRef = useRef(false);

  const showDesc = useMemo(() => !!r?.includes("l"), [r]);

  useEffect(() => {
    void i18n.changeLanguage(languageCode);
  }, [languageCode]);

  const { isLoading, mutateAsync } = useMutation(async (text: string) =>
    (await apiReady).uninstalledFeedback({ text: `${text}【${version}】` })
  );

  useEffect(() => {
    if (!sendRef.current) {
      sendRef.current = true;
      ga.event({
        category: "Uninstall Extension",
        action: `User_Type_${r.includes("i")}_${r.includes("w")}_${r.includes(
          "t"
        )}`,
      });
    }
  }, [r]);

  const submit = useCallback(async () => {
    if (isLoading || error) {
      return;
    }
    if (!reason) {
      setError(t<string>("selectReasonError"));
      return;
    }
    const requiresDetails = !reasonsWithoutDetails.includes(reason);
    if (!requiresDetails || input?.trim()) {
      const feedback = [`option: ${t(`reasons.${reason}`, { lng: "en" })}`];
      if (requiresDetails) {
        feedback.push(`content: ${input.trim()}`);
      }
      mutateAsync(feedback.join("\n"))
        .then(() => {
          setDone(true);
        })
        .catch((error) => {
          toast(error?.message || t<string>("tryAgain"), {
            duration: 1000,
          });
        });
    } else {
      setError(t<string>("enterContentError"));
    }
  }, [isLoading, error, input, mutateAsync, reason, t]);

  if (done) {
    return <UninstallFeedbackDone />;
  }

  return (
    <div className={styles.container} lang={languageCode}>
      <Toaster
        containerStyle={{
          top: 165,
        }}
        toastOptions={{
          style: {
            color: "var(--r-neutral-title2, #FFF)",
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            background: "black",
            borderRadius: 0,
          },
        }}
      />
      <div className={styles.box}>
        <div className={styles.header}>
          <img
            className={styles.logo}
            src="/assets/feedback/logo.svg"
            alt="Rabby"
          />
          <div className={styles.title}>{t("title")}</div>
        </div>
        {showDesc && <div className={styles.desc}>{t("description")}</div>}
        <div className={styles.divider} />

        <div className={styles.sub}>{t("question")}</div>
        <div className={styles.feedbackBox}>
          <div className={styles.reasonList}>
            {reasonKeys
              .filter(
                (item) =>
                  !reason ||
                  reasonsWithoutDetails.includes(reason) ||
                  item === reason
              )
              .map((item) => (
                <button
                  key={item}
                  type="button"
                  className={clsx(
                    styles.reason,
                    reason === item && styles.selectedReason
                  )}
                  onClick={() => {
                    setReason((currentReason) =>
                      currentReason === item ? "" : item
                    );
                    setInput("");
                    setError("");
                  }}
                >
                  <span className={styles.reasonContent}>
                    <span className={styles.reasonRadio} aria-hidden="true" />
                    <span>{t(`reasons.${item}`)}</span>
                  </span>
                </button>
              ))}
          </div>
          {reason && !reasonsWithoutDetails.includes(reason) && (
            <div className={styles.inputBox}>
              <textarea
                autoFocus
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (e.target.value.length > 1000) {
                    setError(
                      t<string>("limitError", {
                        length: e.target.value.length,
                      })
                    );
                  } else {
                    setError("");
                  }
                }}
                className={clsx(styles.textarea, error && styles.err)}
                spellCheck={false}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                placeholder={t<string>("detailsPlaceholder")}
              />
            </div>
          )}
          {!!error && <div className={styles.error}>{error}</div>}
        </div>

        <button type="button" className={styles.submit} onClick={submit}>
          {t("submit")}
        </button>
      </div>
      <div className={styles.installBtnContainer}>
        <a
          href="https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch"
          target="_blank"
          rel="noreferrer"
          className={styles.installBtn}
          onClick={() => {
            ga.event({
              category: "User",
              action: "Click_Reinstall_Extension",
            });
          }}
        >
          <img src="/assets/images/chrome-2x.png" alt="" />
          {t("reinstall")}
        </a>
      </div>
    </div>
  );
};
