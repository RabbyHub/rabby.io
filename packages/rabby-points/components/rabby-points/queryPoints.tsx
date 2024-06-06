"use client";

import { BASE_PATH } from "@/constant";
import styles from "./style.module.scss";
import { useCallback, useEffect, useState } from "react";
import { isAddress } from "viem";
import { useQuery } from "react-query";
import { Loading } from "./Loading";

import { OpenApiService } from "@rabby-wallet/rabby-api";
import { WebSignApiPlugin } from "@rabby-wallet/rabby-api/dist/plugins/web-sign";
import { ClearIcon } from "./icons";
import clsx from "clsx";

const isSameAddr = (a: string, b: string) =>
  a.toLowerCase() === b.toLowerCase();

const api = new OpenApiService({
  store: {
    host: "https://api.rabby.io",
  },
  plugin: WebSignApiPlugin,
});

const apiReady = new Promise<OpenApiService>((resolve, reject) => {
  api
    .init()
    .then(() => resolve(api))
    .catch(reject);
});

const QueryPoints = () => {
  const [addr, setAddr] = useState("");
  const data = useQuery({
    queryKey: ["queryPoints"],
    queryFn: async () =>
      (await apiReady).getRabbyPointsSnapshotV2({
        id: addr,
      }),
    enabled: false,
  });

  const [error, setError] = useState("");
  const queryPoints = useCallback(() => {
    if (!isAddress(addr)) {
      if (addr) {
        setError("Invalid address");
      }
      return;
    }
    setError("");
    data.refetch();
  }, [addr, data]);

  useEffect(() => {
    if (data?.error) {
      console.log("data?.erro", data?.error);
      setError(String((data.error as any)?.message || data.error));
    }
  }, [data?.error]);

  useEffect(() => {
    if (!addr) {
      setError("");
    }
  }, [addr]);

  return (
    <div className={styles.queryWrapper}>
      <div className={styles.inputWrapper}>
        <div className={styles.searchInputWrapper}>
          <img
            className={styles.searchIcon}
            src={`${BASE_PATH}/assets/rabby-points/search.svg`}
            alt="search"
          />
          <input
            spellCheck="false"
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="off"
            autoFocus
            value={addr}
            onChange={(e) => setAddr(e.target.value?.trim())}
            className={styles.addrInput}
            placeholder="Enter address to check how many points you can claim"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                queryPoints();
              }
            }}
          />
          <textarea
            spellCheck="false"
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="off"
            autoFocus
            value={addr}
            onChange={(e) => setAddr(e.target.value?.trim())}
            className={styles.addrInput}
            placeholder="Enter address to check how many points you can claim"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                queryPoints();
              }
            }}
          />
        </div>

        <button className={styles.checkBtn} onClick={queryPoints}>
          <span>Check</span>{" "}
          {(data.isLoading || data.isFetching) && <Loading />}
          {!!addr && (
            <ClearIcon
              className={styles.clearIcon}
              onClick={(e) => {
                e.stopPropagation();
                setAddr("");
              }}
            />
          )}
        </button>
      </div>
      {!!addr &&
        !error &&
        (data?.isFetching ||
          data?.isLoading ||
          isSameAddr(addr, data?.data?.id || "")) && (
          <div className={styles.result}>
            <div>
              {data.data?.claimed ? "You have claimed" : "You can claim"}
            </div>
            <div
              className={clsx(
                (data?.isFetching || data?.isLoading) && styles.numLoading
              )}
            >
              {!data?.data
                ? "00000"
                : data.data?.claimed
                ? (data?.data as any)?.claimed_points
                : data?.data?.active_stats_reward +
                  data?.data?.wallet_balance_reward}
            </div>
          </div>
        )}
      {!!addr && !!error && <div className={styles.errorBox}>{error}</div>}
    </div>
  );
};

export default QueryPoints;
