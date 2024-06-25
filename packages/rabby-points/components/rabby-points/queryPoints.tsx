"use client";

import { BASE_PATH } from "@/constant";
import styles from "./style.module.scss";
import { useCallback, useEffect, useState } from "react";
import { isAddress } from "viem";
import { useQuery } from "react-query";
import { Loading } from "./Loading";

import { ClearIcon } from "./icons";
import clsx from "clsx";
import { useDebounceValue } from "./hook";

const endTimerNumber = 1719791999;

async function getApiReady() {
  return (await import("@/service/api")).default;
}

const isSameAddr = (a: string, b: string) =>
  a?.toLowerCase() === b?.toLowerCase();

const QueryPoints = () => {
  const [addr, setAddr] = useState("");

  const addrDebounce = useDebounceValue(addr, 200);
  const data = useQuery({
    queryKey: ["queryPoints"],
    queryFn: async () =>
      (await getApiReady()).getRabbyPointsSnapshotV2({
        id: addr,
      }),
    enabled: false,
  });

  const ensState = useQuery({
    queryKey: ["ensState", addrDebounce],
    queryFn: async () =>
      (await getApiReady()).getEnsAddressByName(addrDebounce),
  });

  const deBankIdState = useQuery({
    queryKey: ["deBankIdState", addrDebounce],
    queryFn: async () =>
      (await getApiReady()).getAddressByDeBankId(addrDebounce),
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

  const confirmAddr = useCallback(
    (str: string) => {
      setAddr(str);
      setError("");
      setTimeout(() => {
        data.refetch();
      });
    },
    [data]
  );

  useEffect(() => {
    if (data?.error) {
      setError(String((data.error as any)?.message || data.error));
    }
  }, [data?.error]);

  useEffect(() => {
    if (!addr) {
      setError("");
    }
  }, [addr]);

  if (Math.floor(Date.now() / 1000) > endTimerNumber) {
    return null;
  }

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
            onChange={(e) => {
              setError("");
              setAddr(e.target.value?.trim());
            }}
            className={styles.addrInput}
            placeholder="Enter Address/ENS/Web3ID to check your Points"
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
            onChange={(e) => {
              setError("");
              setAddr(e.target.value?.trim());
            }}
            className={styles.addrInput}
            placeholder="Enter Address/ENS/Web3ID to check your Points"
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
      <div className={styles.searchWrapper}>
        {!!addr &&
          !error &&
          deBankIdState?.data?.addr &&
          isSameAddr(addr, deBankIdState?.data?.web3_id || "") && (
            <Item onConfirm={confirmAddr} {...deBankIdState?.data} />
          )}

        {!!addr &&
          !error &&
          ensState?.data?.addr &&
          isSameAddr(addr, ensState?.data?.name || "") && (
            <Item onConfirm={confirmAddr} {...ensState?.data} />
          )}
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
                ? ""
                : data.data?.claimed
                ? (data?.data as any)?.claimed_points
                : data?.data?.active_stats_reward +
                  data?.data?.wallet_balance_reward}
            </div>

            {data.data?.claimed === false &&
              data?.data?.active_stats_reward +
                data?.data?.wallet_balance_reward >
                0 &&
              !data?.isFetching &&
              !data?.isLoading && (
                <a
                  className={styles.claimBtn}
                  target="_blank"
                  rel="noreferrer"
                  href="https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch"
                >
                  Claim on Rabby Wallet
                </a>
              )}
          </div>
        )}
      {!!addr && !!error && <div className={styles.errorBox}>{error}</div>}
    </div>
  );
};

const Item = (props: {
  onConfirm: (addr: string) => void;
  addr: string;
  web3_id?: string;
  name?: string;
}) => {
  if (!isAddress(props.addr)) {
    return null;
  }
  return (
    <div className={styles.addrBox} onClick={() => props.onConfirm(props.addr)}>
      <img
        className={styles.addrTypeIcon}
        src={`${BASE_PATH}/assets/rabby-points/${
          props.web3_id ? "debank" : "ens"
        }.png`}
      />
      <div className={styles.searchAddr}>{props.addr}</div>
    </div>
  );
};

export default QueryPoints;
