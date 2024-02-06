"use client";
import clsx from "clsx";
import { atom, useAtom } from "jotai";
import { useMemo } from "react";

const tabAtom = atom("extension");
export const useTab = () => {
  const [tab, switchTab] = useAtom(tabAtom);
  const isExtension = useMemo(() => tab === "extension", [tab]);

  return {
    isExtension,
    tab,
    switchTab,
  };
};

const activeClass = "bg-white bg-opacity-20";
export const Tabs = () => {
  const { isExtension, switchTab } = useTab();

  return (
    <div className="w-[448px] h-11 p-1 bg-black bg-opacity-10 rounded-lg flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="justify-start items-start inline-flex">
        <div
          className={clsx(
            "w-[220px] h-9 relative rounded-md cursor-pointer",
            isExtension ? activeClass : "hover:bg-white hover:bg-opacity-10"
          )}
          onClick={() => {
            switchTab("extension");
          }}
        >
          <div className="left-[12.50px] top-[8px] absolute justify-start items-center gap-1 inline-flex">
            <div className="w-5 h-5 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M10.5013 6.25521C12.5724 6.25521 14.2513 7.93412 14.2513 10.0052C14.2513 12.0763 12.5724 13.7552 10.5013 13.7552C8.43022 13.7552 6.7513 12.0763 6.7513 10.0052C6.7513 7.93412 8.43022 6.25521 10.5013 6.25521ZM10.5013 6.25521H17.9452M7.58464 17.8139L12.8529 12.9219M3.0013 6.36842L7.53259 12.3185M10.5013 18.3385C15.1037 18.3385 18.8346 14.6076 18.8346 10.0052C18.8346 5.40283 15.1037 1.67188 10.5013 1.67188C5.89893 1.67188 2.16797 5.40283 2.16797 10.0052C2.16797 14.6076 5.89893 18.3385 10.5013 18.3385Z"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-center text-white text-sm font-normal font-['SF Pro']">
              Claim on Rabby Extension
            </div>
          </div>
        </div>
        <div
          className={clsx(
            "w-[220px] h-9 relative rounded-md cursor-pointer",

            !isExtension ? activeClass : "hover:bg-white hover:bg-opacity-10"
          )}
          onClick={() => {
            switchTab("mobile");
          }}
        >
          <div className="left-[22.50px] top-[8px] absolute justify-start items-center gap-1 inline-flex">
            <div className="w-5 h-5 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M14.6668 1.66406H6.3335C5.64314 1.66406 5.0835 2.22371 5.0835 2.91406V17.0807C5.0835 17.7711 5.64314 18.3307 6.3335 18.3307H14.6668C15.3572 18.3307 15.9168 17.7711 15.9168 17.0807V2.91406C15.9168 2.22371 15.3572 1.66406 14.6668 1.66406Z"
                  stroke="white"
                  strokeWidth="1.25"
                />
                <path
                  d="M9.6665 4.16406H11.3332"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.8335 15.8359H12.1668"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-center text-white text-sm font-normal font-['SF Pro']">
              Claim on Rabby Mobile{" "}
            </div>
          </div>
          <div className="w-[35px] px-1 left-[187px] top-[-1px] absolute bg-white bg-opacity-20 rounded-tl-sm rounded-tr-lg rounded-bl-lg rounded-br-sm justify-center items-center gap-2.5 inline-flex">
            <div className="text-center text-white text-[10px] font-normal font-['SF Pro']">
              Beta
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
