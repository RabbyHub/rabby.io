import { useEffect } from "react";
import { UPDATE_CHANNEL } from "./protocol";

type Provider = { request(args: { method: string }): Promise<unknown> };

// This document must be navigated, not srcdoc/about:blank: each navigation
// receives a fresh extension content script after runtime.reload().
export function UpdatingBridge() {
  useEffect(() => {
    if (window.parent === window) return;
    const nonce = new URLSearchParams(window.location.search).get("nonce");
    if (!nonce) return;
    let provider: Provider | undefined;
    let disposed = false;
    let probing = false;
    let opening = false;
    let timer: number | undefined;
    const send = (data: object) => {
      if (!disposed)
        window.parent.postMessage(
          { ...data, channel: UPDATE_CHANNEL, nonce },
          window.location.origin
        );
    };
    const probe = async () => {
      if (!provider || probing) return;
      probing = true;
      window.clearInterval(timer);
      try {
        const status = await provider.request({
          method: "rabby:getUpdateStatus",
        });
        send({ type: "status", status });
      } catch {
        // The parent will navigate a new frame if this context is orphaned.
      }
    };
    const announce = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (
        detail?.info?.rdns === "io.rabby" &&
        typeof detail.provider?.request === "function"
      ) {
        provider = detail.provider;
        void probe();
      }
    };
    const discover = () => {
      if (probing) return;
      window.dispatchEvent(new Event("eip6963:requestProvider"));
      const fallback = (window as Window & { rabby?: Provider }).rabby;
      if (!provider && typeof fallback?.request === "function")
        provider = fallback;
      void probe();
    };
    const onMessage = async (event: MessageEvent) => {
      if (
        event.source !== window.parent ||
        event.origin !== window.location.origin
      )
        return;
      const data = event.data;
      if (
        data?.channel !== UPDATE_CHANNEL ||
        data.nonce !== nonce ||
        data.type !== "open" ||
        typeof data.id !== "string" ||
        !provider ||
        opening
      )
        return;
      opening = true;
      try {
        await provider.request({ method: "rabby:openPopup" });
        send({ type: "opened", id: data.id });
      } catch {
        send({ type: "open-error", id: data.id });
      } finally {
        opening = false;
      }
    };
    window.addEventListener("eip6963:announceProvider", announce);
    window.addEventListener("message", onMessage);
    discover();
    if (!probing) timer = window.setInterval(discover, 200);
    return () => {
      disposed = true;
      window.clearInterval(timer);
      window.removeEventListener("eip6963:announceProvider", announce);
      window.removeEventListener("message", onMessage);
    };
  }, []);
  return null;
}
