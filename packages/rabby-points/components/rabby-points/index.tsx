"use client";
import style from "./style.module.scss";
import { ShowCode } from "./code";
import { BASE_PATH } from "@/constant";
import { Content } from "./content";

export const RabbyPointsReferral = () => {
  return (
    <>
      <div className={style.container}>
        <img
          className={style.startIcon}
          src={`${BASE_PATH}/assets/rabby-points/start.svg`}
          alt="start"
        />
        <div className={style.title}>
          You&apos;ve been invited to Rabby Points
        </div>
        <div className={style.box}>
          <div className={style.referral}>
            Enter referral code to get extra bonus
          </div>
          <ShowCode />
        </div>
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
    </>
  );
};
