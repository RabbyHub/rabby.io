import { BASE_PATH } from "@/constant";
import clsx from "clsx";
import { Scan } from "./scan";

const storeList = [
  {
    title: "Google Play",
    img: `${BASE_PATH}/assets/rabby-points/play-store.png`,
    store:
      "https://play.google.com/store/apps/details?id=com.debank.rabbymobile",
  },
  {
    title: "App Store",
    img: `${BASE_PATH}/assets/rabby-points/app-store.png`,
    store: "",
  },
];
export const MobilePanel = () => {
  return (
    <>
      <div className="text-center text-white text-[15px] font-medium mb-[18px]">
        1. Download Rabby Wallet Mobile Beta
      </div>

      <div className="flex items-center gap-[16px] mb-[30px]">
        {storeList.map((item) => (
          <StoreItem key={item.title} {...item} />
        ))}
      </div>

      <div className="text-center text-white text-[15px] font-medium">
        2. Connect your wallet and go to Rabby Points
      </div>
      <div className="h-4 justify-start items-center gap-0.5 inline-flex mt-[10px] mb-[16px]">
        <div className="opacity-70 text-center text-white text-[13px] font-light">
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

const StoreItem = (props: { title: string; img: string; store?: string }) => {
  const isMobileBrowser = isMobile();
  return (
    <div
      onClick={() => {
        if (props.store) {
          window.open(props.store, "_blank")?.focus();
        }
      }}
      className={clsx(
        "w-40 h-[110px] relative bg-white rounded-lg shadow overflow-hidden group ",
        props.store ? "cursor-pointer" : ""
      )}
    >
      {!props.store && (
        <div className="w-full h-full absolute top-0 left-0 bg-white opacity-50 z-10" />
      )}
      {!isMobileBrowser && props.store ? (
        <Scan url={props.store} className="hidden group-hover:flex" />
      ) : null}
      <div className="w-full h-full flex flex-col items-center justify-center gap-[10px]">
        <img className="w-[40px] h-[40px]" src={props.img} alt={props.title} />
        <div
          className={clsx(
            "text-center text-[#192945] text-[15px] font-medium",
            !isMobileBrowser && props.store && "group-hover:hidden"
          )}
        >
          <span className={!props.store ? "group-hover:hidden" : ""}>
            {props.title}
          </span>
          <span
            className={
              !props.store ? "hidden group-hover:inline-block" : "hidden"
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
