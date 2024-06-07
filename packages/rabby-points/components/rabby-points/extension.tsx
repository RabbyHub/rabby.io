import { BASE_PATH } from "@/constant";
import style from "./style.module.scss";

export const ExtensionPanel = () => {
  return (
    <>
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
        src={`${BASE_PATH}/assets/rabby-points/season2-guide-2.png`}
        alt=""
      />
    </>
  );
};
