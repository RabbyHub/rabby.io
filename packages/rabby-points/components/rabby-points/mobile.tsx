import { BASE_PATH } from "@/constant";
import clsx from "clsx";
import { Scan } from "./scan";
import styles from "./style.module.scss";

const storeList: InstallItem[] = [
  {
    title: "Google Play",
    img: `${BASE_PATH}/assets/rabby-points/play-store.png`,
    linkURL:
      "https://play.google.com/store/apps/details?id=com.debank.rabbymobile",
  },
  {
    title: "Android APK",
    img: `${BASE_PATH}/assets/rabby-points/android-apk.svg`,
    linkURL:
      "https://download.rabby.io/downloads/wallet-mobile/android/rabby-mobile.apk",
  },
  {
    title: "App Store",
    img: `${BASE_PATH}/assets/rabby-points/app-store.png`,
    linkURL: "https://apps.apple.com/us/app/rabby-wallet-crypto-evm/id6474381673",
  },
];
export const MobilePanel = () => {
  return (
    <>
      <div className={clsx(styles.subTitle, "mb-[18px]")}>
        1. Download Rabby Wallet Mobile Beta
      </div>

      <div className="flex flex-wrap items-center justify-center gap-[16px] mb-[30px]">
        {storeList.map((item) => (
          <InstallItem key={item.title} {...item} />
        ))}
      </div>

      <div className={clsx(styles.subTitle)}>
        2. Connect your wallet and go to Rabby Points
      </div>
      <div className="h-4 justify-start items-center gap-0.5 inline-flex mt-[-6px] mb-[16px]">
        <div className="opacity-70 text-center text-white text-[12px] sm:text-[13px] font-light">
          <span className="relative top-[1px] inline-block">*</span> No seed
          phrase or private key required
        </div>
      </div>
      <div className="flex items-center">
        <img
          className="w-[207px] h-[379px]"
          src={`${BASE_PATH}/assets/rabby-points/points-example.png`}
          alt="rabby-points"
        />
      </div>
    </>
  );
};

export const isIOS = () => {
  if (typeof window !== "undefined") {
    const ua = window?.navigator?.userAgent?.toLowerCase();
    if (ua) {
      return /iphone|ipad|ipod/.test(ua);
    }
    return window.innerWidth < 800;
  }
  return false;
};

const isMobile = () => {
  if (typeof window !== "undefined") {
    const ua = window?.navigator?.userAgent?.toLowerCase();
    if (ua) {
      return /iphone|ipad|ipod|android/.test(ua);
    }
    return window.innerWidth < 800;
  }
  return false;
};

type InstallItem = {
  title: string;
  img: string;
  linkURL?: string;
}
const InstallItem = (props: InstallItem) => {
  const isMobileBrowser = isMobile();
  return (
    <div
      onClick={() => {
        if (props.linkURL) {
          window.open(props.linkURL, "_blank")?.focus();
        }
      }}
      className={clsx(
        "w-40 h-[110px] relative bg-white rounded-lg shadow overflow-hidden group ",
        props.linkURL ? "cursor-pointer" : ""
      )}
    >
      {!props.linkURL && (
        <div className="w-full h-full absolute top-0 left-0 bg-white opacity-50 z-10" />
      )}
      {!isMobileBrowser && props.linkURL ? (
        <Scan url={props.linkURL} className="hidden group-hover:flex" />
      ) : null}
      <div className="w-full h-full flex flex-col items-center justify-center gap-[10px]">
        <img className="w-[40px] h-[40px]" src={props.img} alt={props.title} />
        <div
          className={clsx(
            "text-center text-[#192945] text-[15px] font-medium",
            !isMobileBrowser && props.linkURL && "group-hover:hidden"
          )}
        >
          <span className={!props.linkURL ? "group-hover:hidden" : ""}>
            {props.title}
          </span>
          <span
            className={
              !props.linkURL ? "hidden group-hover:inline-block" : "hidden"
            }
          >
            Under review
          </span>
        </div>
      </div>
      <div
        className={clsx(
          "w-[70.62px] h-[128.98px] left-[77px] top-[-29.88px] absolute origin-top-left rotate-[-44.07deg] bg-[#7084FF]",
          !isMobileBrowser && "group-hover:hidden"
        )}
      />
      <div
        className={clsx(
          "w-6 h-6 left-[132px] top-[3px] absolute",
          !isMobileBrowser && "group-hover:hidden"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M10 3H3V10H10V3Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M10 14H3V21H10V14Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M21 3H14V10H21V3Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M14.5 14V21"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M20.5 14V21"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
