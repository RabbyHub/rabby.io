import style from "./style.module.scss";
import clsx from "clsx";
import { ShowCode } from "./code";
import { BASE_PATH } from "@/constant";

export const RabbyPointsReferral = () => {
  return (
    <>
      <div
        className={style.container}
        style={{
          backgroundImage: `url(${BASE_PATH}/assets/rabby-points/bg.svg)`,
        }}
      >
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
        <div className={clsx(style.box, style.box2)}>
          <div className={style.subTitle}>
            1. Download Rabby Wallet browser extension{" "}
          </div>

          <a
            className={style.install}
            target="_blank"
            rel="noreferrer"
            href="https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch"
          >
            <img
              className={style.chromeIcon}
              src={`${BASE_PATH}/assets/rabby-points/chrome.png`}
              alt={"Install Rabby Wallet"}
            />
            <span>Install Rabby Wallet</span>
          </a>

          <div className={style.subTitle}>
            2. Migrate your address and go to Rabby Points
          </div>
          <img
            className={style.guide}
            src={`${BASE_PATH}/assets/rabby-points/guide-2.png`}
            alt=""
          />
        </div>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className={style.logoWrapper}
        >
          {/* <img className={style.logo} alt="Rabby Wallet" /> */}
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
