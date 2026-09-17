import { useEffect, useRef, useState } from "react";
import { isAtLeastVersion, isVersion, UPDATE_CHANNEL } from "./protocol";

type UpdateBridgeError = "" | "errors.updateTimeout" | "errors.openWallet";

export function useUpdateBridge() {
  const [ready, setReady] = useState(false);
  const [opening, setOpening] = useState(false);
  // Keep error keys in state so language changes do not restart the bridge.
  const [error, setError] = useState<UpdateBridgeError>("");
  const [attempt, setAttempt] = useState(0);
  const [version, setVersion] = useState(() => {
    const value = new URLSearchParams(window.location.search).get("version");
    return isVersion(value) ? value : "";
  });
  const openRef = useRef<() => void>(() => {});

  useEffect(() => {
    let frame: HTMLIFrameElement | undefined;
    let nonce = "";
    let requestId = "";
    let readyNow = false;
    let pollTimer: number;
    let openTimer: number;
    let target = version;
    const started = Date.now();
    setReady(false);
    setOpening(false);
    setError("");
    const next = () => {
      frame?.remove();
      frame = undefined;
      if (Date.now() - started >= 120_000) {
        setError("errors.updateTimeout");
        return;
      }
      nonce = crypto.randomUUID();
      frame = document.createElement("iframe");
      frame.hidden = true;
      frame.title = "Rabby update connection";
      frame.src = `/updating/bridge?nonce=${encodeURIComponent(nonce)}`;
      document.body.appendChild(frame);
      pollTimer = window.setTimeout(next, 2500);
    };
    const failedOpen = () => {
      requestId = "";
      setOpening(false);
      setError("errors.openWallet");
      readyNow = false;
      setReady(false);
      next();
    };
    const onMessage = (event: MessageEvent) => {
      if (
        !frame ||
        event.source !== frame.contentWindow ||
        event.origin !== window.location.origin
      )
        return;
      const data = event.data;
      if (data?.channel !== UPDATE_CHANNEL || data.nonce !== nonce) return;
      if (data.type === "status" && !readyNow) {
        const status = data.status;
        if (
          !isVersion(status?.version) ||
          !(status.pendingVersion === null || isVersion(status.pendingVersion))
        )
          return;
        if (!target && status.pendingVersion) {
          target = status.pendingVersion;
          setVersion(target);
        }
        if (
          status.pendingVersion !== null ||
          (target && !isAtLeastVersion(status.version, target))
        )
          return;
        readyNow = true;
        window.clearTimeout(pollTimer);
        setVersion(status.version);
        setReady(true);
      } else if (requestId && data.id === requestId) {
        if (data.type === "opened") {
          window.clearTimeout(openTimer);
          requestId = "";
          setOpening(false);
          setError("");
        } else if (data.type === "open-error") {
          window.clearTimeout(openTimer);
          failedOpen();
        }
      }
    };
    openRef.current = () => {
      if (!readyNow || !frame?.contentWindow || requestId) return;
      requestId = crypto.randomUUID();
      setOpening(true);
      setError("");
      frame.contentWindow.postMessage(
        { channel: UPDATE_CHANNEL, nonce, type: "open", id: requestId },
        window.location.origin
      );
      openTimer = window.setTimeout(failedOpen, 10_000);
    };
    window.addEventListener("message", onMessage);
    next();
    return () => {
      window.clearTimeout(pollTimer);
      window.clearTimeout(openTimer);
      window.removeEventListener("message", onMessage);
      frame?.remove();
      openRef.current = () => {};
    };
    // Version is displayed state; changing it must not discard the live bridge.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  return {
    ready,
    opening,
    error,
    version,
    openWallet: () => openRef.current(),
    retry: () => setAttempt((value) => value + 1),
  };
}
