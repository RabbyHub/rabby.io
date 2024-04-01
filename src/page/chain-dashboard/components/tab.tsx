import clsx from "clsx";
import style from "./style.module.scss";
import { CSSProperties } from "react";

export const Tab = ({
  activeTab,
  setActiveTab,
  list,
  itemStyle,
}: {
  list: string[];
  activeTab: number;
  setActiveTab: (idx: number) => void;
  itemStyle?: CSSProperties;
}) => {
  return (
    <div className={style.tab}>
      {list.map((e, idx) => (
        <div
          key={e}
          className={clsx(style.item, {
            [style.activeTab]: activeTab === idx,
          })}
          onClick={() => setActiveTab(idx)}
          style={itemStyle}
        >
          {e}
        </div>
      ))}
    </div>
  );
};
