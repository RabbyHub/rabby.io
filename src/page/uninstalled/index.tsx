import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./style.module.css";
import { useSearchParams } from "react-router-dom";
import { UninstallFeedbackDone } from "./done";
import clsx from "clsx";
import { ga } from "../../ga";
import { useMutation } from "react-query";
import { apiReady } from "../../service";
import toast, { Toaster } from "react-hot-toast";

export const Uninstalled = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const [search] = useSearchParams();

  const r = useMemo(() => search.get("r"), [search]);
  const sendRef = useRef(false);

  const showDesc = useMemo(() => !!r?.includes("l"), [r]);

  const { isLoading, mutateAsync } = useMutation(async (text: string) =>
    (await apiReady).uninstalledFeedback({ text })
  );

  useEffect(() => {
    if (r && !sendRef.current) {
      sendRef.current = true;
      ga.event({
        category: "Uninstall Extension",
        action: `User_Type_${r.includes("i")}_${r.includes("w")}_${r.includes(
          "t"
        )}`,
      });
    }
  }, [r]);

  const close = () => {
    window.close();
  };

  const submit = useCallback(async () => {
    if (isLoading || error) {
      return;
    }
    if (input?.trim()) {
      mutateAsync(input)
        .then(() => {
          setDone(true);
        })
        .catch((error) => {
          toast(error?.message || "Please try again", {
            duration: 1000,
          });
        });
    } else {
      setError("Please enter content");
    }
  }, [isLoading, error, input, mutateAsync]);

  if (done) {
    return <UninstallFeedbackDone />;
  }

  return (
    <div className={styles.container}>
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
        <img
          className={styles.logo}
          src="/assets/feedback/logo.svg"
          alt="Rabby"
        />
        <div className={styles.title}>We're sorry to see you go</div>
        {showDesc && (
          <div className={styles.desc}>
            Your Seed Phrase, private keys and addresses have been successfully
            removed from this device. You can still access them on the
            blockchain.
          </div>
        )}
        <div className={styles.divider} />

        <div className={styles.sub}>Why are you uninstalling Rabby Wallet?</div>
        <div className={styles.inputBox}>
          <textarea
            autoFocus
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (e?.target?.value?.length > 1000) {
                setError(
                  `Maximum word limit exceeded - ${e.target.value.length}`
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
            placeholder="Please share your reason for uninstalling. Rabby values your feedback!"
          />
          {!!error && <div className={styles.error}>{error}</div>}
        </div>

        <div className={styles.submit} onClick={submit}>
          Submit
        </div>
        <div className={styles.skip} onClick={close}>
          Skip
        </div>
      </div>
    </div>
  );
};
