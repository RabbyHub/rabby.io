"use client";
import toast, { Toaster } from "react-hot-toast";

import { useSearchParams } from "next/navigation";
import style from "./style.module.scss";
import { BASE_PATH } from "@/constant";

export const ShowCode = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code")?.toUpperCase();

  const copy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      toast("Referral code copied", {
        duration: 4000,
        style: {
          top: 200,
        },
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="none"
            viewBox="0 0 16 16"
          >
            <g clipPath="url(#a)">
              <path
                fill="#2ABB7F"
                d="M8 15.2a7.177 7.177 0 0 0 5.091-2.109A7.177 7.177 0 0 0 15.2 8a7.177 7.177 0 0 0-2.109-5.091A7.177 7.177 0 0 0 8 .8a7.178 7.178 0 0 0-5.091 2.109A7.178 7.178 0 0 0 .8 8c0 1.988.806 3.788 2.109 5.091A7.177 7.177 0 0 0 8 15.2Z"
              />
              <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.143}
                d="m4.667 8 2.445 2.444L12 5.554"
              />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h16v16H0z" />
              </clipPath>
            </defs>
          </svg>
        ),
      });
    }
  };
  return (
    <div className={style.codeBox} onClick={copy}>
      <span className={style.code}>
        {code}
        <div className={style.copyIconWrapper}>
          <img
            className={style.copyIcon}
            src={`${BASE_PATH}/assets/rabby-points/copy.svg`}
            alt="copy"
          />
        </div>
      </span>

      <Toaster
        containerStyle={{
          top: 100,
        }}
        toastOptions={{
          // className: style.toast,
          style: {
            color: "var(--r-neutral-title2, #FFF)",
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            background: "black",
            borderRadius: 0,
          },
        }}
      />
    </div>
  );
};
