import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import i18n, { getSupportedLanguageCode } from "../../i18n";
import { useUpdateBridge } from "./useUpdateBridge";
import { useVersionChangelog } from "./useVersionChangelog";
import styles from "./style.module.scss";

export function Updating() {
  const { t } = useTranslation("translation", {
    keyPrefix: "page.updating",
  });
  const [searchParams] = useSearchParams();
  const version = searchParams.get("version") ?? "";
  const languageCode = getSupportedLanguageCode(searchParams.get("lang"));
  const { ready, opening, error, openWallet, retry } = useUpdateBridge();

  useEffect(() => {
    void i18n.changeLanguage(languageCode);
  }, [languageCode]);

  const changelog = useVersionChangelog(version);
  const latestVersion = changelog.data;
  const localizedChangelog =
    languageCode === "zh-CN"
      ? latestVersion?.changelog_cn
      : latestVersion?.changelog;
  const defaultChangelog =
    i18n.language.toLowerCase() === "zh-cn"
      ? "- 修复了一些已知问题"
      : "- Fixed some bugs and optimized user experience";
  const changelogContent = localizedChangelog?.trim()
    ? localizedChangelog
    : defaultChangelog;
  return (
    <main className={styles.page} lang={languageCode}>
      <section className={styles.card} aria-labelledby="update-title">
        <div className={styles.status} role="status" aria-live="polite">
          <img
            className={ready ? undefined : styles.spinner}
            src={`/assets/updating/${ready ? "success" : "loading"}.svg`}
            width="40"
            height="40"
            alt=""
          />
          <h1 id="update-title">{t(ready ? "completed" : "processing")}</h1>
        </div>
        <div className={styles.notes}>
          <h2>{t("whatsNew")}</h2>
          {latestVersion?.id && (
            <p className={styles.version}>
              {t("version", { version: latestVersion.id })}
            </p>
          )}
          <div className={styles.changelog} aria-live="polite">
            {!version ? (
              t("waitingVersion")
            ) : changelog.isLoading ? (
              t("loadingChangelog")
            ) : changelog.isError ? (
              <>
                {t("changelogError")}{" "}
                <button
                  className={styles.retry}
                  onClick={() => void changelog.refetch()}
                  disabled={changelog.isFetching}
                >
                  {t("retry")}
                </button>
              </>
            ) : (
              changelogContent.split("\n").map((line, i) => {
                if (line.startsWith("- ")) {
                  return (
                    <div key={i} className={styles.noteListItem}>
                      {line.slice(2)}
                    </div>
                  );
                }
                if (line.startsWith("# ")) {
                  return (
                    <div key={i} className={styles.noteTitle}>
                      {line.slice(2)}
                    </div>
                  );
                }
                return (
                  <div key={i} className={styles.noteLine}>
                    {line}
                  </div>
                );
              })
            )}
          </div>
        </div>
        {error && (
          <div className={styles.error} role="alert">
            {t(error)} <button onClick={retry}>{t("checkAgain")}</button>
          </div>
        )}
        <button
          className={styles.open}
          disabled={!ready || opening}
          onClick={openWallet}
        >
          {t(opening ? "opening" : "openWallet")}
        </button>
      </section>
      <img
        className={styles.logo}
        src="/assets/updating/logo.svg"
        alt="Rabby Wallet"
      />
    </main>
  );
}
