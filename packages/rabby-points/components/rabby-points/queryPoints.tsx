"use client";

import { BASE_PATH } from "@/constant";
import styles from "./style.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { isAddress } from "viem";
import { useQuery } from "react-query";
import { Loading } from "./Loading";

import { OpenApiService } from "@rabby-wallet/rabby-api";
import { WebSignApiPlugin } from "@rabby-wallet/rabby-api/dist/plugins/web-sign";

const api = new OpenApiService({
  store: {
    host: "https://points.rabby-api.debank.dbkops.com/", //"https://api.rabby.io",
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
  const inputRef = useRef<HTMLInputElement>(null);
  // const [addr, setAddr] = useState("");
  const data = useQuery({
    queryKey: ["queryPoints"],
    queryFn: async () =>
      (await apiReady).checkClaimInfoV2({ id: inputRef.current?.value || "" }),
    enabled: false,
  });

  const [error, setError] = useState("");
  const queryPoints = useCallback(() => {
    const v = inputRef.current?.value || "";
    if (!isAddress(v)) {
      setError("Invalid address");
      return;
    }
    setError("");
    data.refetch();
  }, [data]);

  useEffect(() => {
    if (data?.error) {
      setError(String((data.error as any)?.message || data.error));
    }
  }, [data?.error]);

  return (
    <div className={styles.queryWrapper}>
      <div className={styles.inputWrapper}>
        <img
          className={styles.searchIcon}
          src={`${BASE_PATH}/assets/rabby-points/search.svg`}
          alt="search"
        />
        <input
          autoCorrect="off"
          autoCapitalize="off"
          autoComplete="off"
          autoFocus
          ref={inputRef}
          // value={addr}
          // onChange={(e) => setAddr(e.target.value)}
          className={styles.addrInput}
          placeholder="Enter address to check how many points you can claim"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              queryPoints();
            }
          }}
        />
        <button className={styles.checkBtn} onClick={queryPoints}>
          <span>Check</span>{" "}
          {(data.isLoading || data.isFetching) && <Loading />}
        </button>
      </div>
      {!error && !!data.data && (
        <div className={styles.result}>
          <div>
            {data.data?.claimable_points && data.data?.claimable_points > 0
              ? "You can claim"
              : "You have claimed"}
          </div>
          <div>{data.data?.claimable_points || data.data?.claimed_points}</div>
        </div>
      )}
      {error && <div className={styles.errorBox}>{error}</div>}
    </div>
  );
};

export default QueryPoints;
