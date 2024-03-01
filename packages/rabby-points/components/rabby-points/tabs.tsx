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

const tabList = [
  {
    id: "extension",
    title: "Claim on Rabby Extension",
    svg: (
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
    ),
  },
  {
    id: "mobile",

    title: "Claim on Rabby Mobile",
    svg: (
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
    ),
    isBeta: true,
  },
];

export const Tabs = () => {
  return (
    <div className="flex justify-center">
      <div
        className={clsx(
          "h-11 p-1 bg-black bg-opacity-10 rounded-lg justify-center items-center inline-flex gap-2.5",
          "w-[448px]",
          "scale-[0.83] sm:scale-100"
        )}
      >
        {tabList.map((item) => (
          <Item {...item} key={item.title} />
        ))}
      </div>
    </div>
  );
};

const Item = ({
  id,
  title,
  svg,
  isBeta = false,
}: {
  id: string;
  title: string;
  svg: React.ReactNode;
  isBeta?: boolean;
}) => {
  const { tab, switchTab } = useTab();
  const isActive = tab === id;
  return (
    <div
      className={clsx(
        "flex-1 flex h-full  justify-center rounded-lg items-center mx-auto",
        "w-[220px] h-9 relative rounded-md cursor-pointer gap-1",
        "w-[220px] h-[36px] overflow-hidden",
        isActive
          ? "bg-white bg-opacity-20"
          : "hover:bg-white hover:bg-opacity-10"
      )}
      onClick={() => {
        switchTab(id);
      }}
    >
      <div className="w-[20px] h-[20px]">{svg}</div>
      <span
        className={clsx(
          "text-[#FFF] text-center  font-400 leading-normal text-nowrap",
          "text-[14px]"
        )}
      >
        {title}
      </span>
      {!!isBeta && (
        <div className="w-[35px] px-1 right-[-2px] top-[-1px] absolute bg-white bg-opacity-20 rounded-tl-sm rounded-tr-lg rounded-bl-lg rounded-br-sm justify-center items-center gap-2.5 inline-flex">
          <div className="text-center text-white text-[10px] font-normal">
            Beta
          </div>
        </div>
      )}
    </div>
  );
};
