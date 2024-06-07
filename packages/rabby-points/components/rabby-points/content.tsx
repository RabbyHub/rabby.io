"use client";
import clsx from "clsx";
import { Tabs, useTab } from "./tabs";
import style from "./style.module.scss";
import { ExtensionPanel } from "./extension";
import { MobilePanel } from "./mobile";

export const Content = () => {
  const { isExtension } = useTab();

  return (
    <div className={clsx(style.box, style.box2)}>
      <div className="mb-[8px] w-full overflow-hidden">{/* <Tabs /> */}</div>

      <div
        className={clsx(
          "flex flex-col items-center justify-center",
          !isExtension && "hidden"
        )}
      >
        {<ExtensionPanel />}
      </div>

      <div
        className={clsx(
          "flex flex-col items-center justify-center",
          isExtension && "hidden"
        )}
      >
        {<MobilePanel />}
      </div>
    </div>
  );
};
