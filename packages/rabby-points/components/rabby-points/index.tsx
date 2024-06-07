"use client";
import style from "./style.module.scss";
import { ShowCode } from "./code";
import { BASE_PATH } from "@/constant";
import { Content } from "./content";
import { Suspense } from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/service";
import QueryPoints from "./queryPoints";
import { useSearchParams } from "next/navigation";

export const RabbyPointsReferral = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code")?.toUpperCase()?.trim();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={style.container}>
        <img
          className={style.startIcon}
          src={`${BASE_PATH}/assets/rabby-points/season2-start.svg`}
          alt="start"
        />
        <div className={style.title}>
          You&apos;ve been invited to Rabby Points
        </div>
        <QueryPoints />
        {!!code && (
          <div className={style.box}>
            <div className={style.referral}>
              Enter referral code to get extra bonus
            </div>
            <Suspense>
              <ShowCode />
            </Suspense>
          </div>
        )}

        <Content />
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className={style.logoWrapper}
        >
          <img
            src={`${BASE_PATH}/assets/rabby-points/logo.svg`}
            className={style.logo}
            alt="Rabby Wallet"
          />
        </a>
      </div>
    </QueryClientProvider>
  );
};
