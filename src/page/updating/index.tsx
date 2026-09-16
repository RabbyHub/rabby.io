import { useSearchParams } from "react-router-dom";
import { useUpdateBridge } from "./useUpdateBridge";
import { useVersionChangelog } from "./useVersionChangelog";
import styles from "./style.module.scss";

export function Updating() {
  const [searchParams] = useSearchParams();
  const version = searchParams.get("version") ?? "";
  const {
    ready,
    opening,
    error,
    openWallet,
    retry,
  } = useUpdateBridge();
  const changelog = useVersionChangelog(version);
  const latestVersion = changelog.data;
  const changelogContent = latestVersion?.changelog?.trim()
    ? latestVersion.changelog
    : "- Fixed some bugs and optimized user experience";
  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="update-title">
        <div className={styles.status} role="status" aria-live="polite">
          <img
            className={ready ? undefined : styles.spinner}
            src={`/assets/updating/${ready ? "success" : "loading"}.svg`}
            width="40"
            height="40"
            alt=""
          />
          <h1 id="update-title">Update {ready ? "Completed" : "Processing"}</h1>
        </div>
        <div className={styles.notes}>
          <h2>What’s New ?</h2>
          {latestVersion?.id && (
            <p className={styles.version}>Version {latestVersion.id}</p>
          )}
          <div className={styles.changelog} aria-live="polite">
            {!version ? (
              "Waiting for version information…"
            ) : changelog.isLoading ? (
              "Loading release notes…"
            ) : changelog.isError ? (
              <>
                Could not load release notes.{" "}
                <button
                  className={styles.retry}
                  onClick={() => void changelog.refetch()}
                  disabled={changelog.isFetching}
                >
                  Retry
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
            {error} <button onClick={retry}>Check again</button>
          </div>
        )}
        <button
          className={styles.open}
          disabled={!ready || opening}
          onClick={openWallet}
        >
          {opening ? "Opening…" : "Open Wallet"}
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
