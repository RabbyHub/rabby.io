"use client";
import clsx from "clsx";
import { Tabs } from "./tabs";
import style from "./style.module.scss";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ExtensionPanel } from "./extension";
import { MobilePanel } from "./mobile";

export const Content = () => {
  const searchParams = useSearchParams();
  const isExtension = useMemo(
    () => !searchParams.get("tab") || searchParams.get("tab") === "extendsion",
    [searchParams]
  );

  return (
    <div className={clsx(style.box, style.box2)}>
      <div className="mb-[23px]">
        <Tabs />
      </div>
      {isExtension ? <ExtensionPanel /> : <MobilePanel />}
    </div>
  );
};
