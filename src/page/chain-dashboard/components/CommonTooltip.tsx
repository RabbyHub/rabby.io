import { Tooltip } from "react-tooltip";
import style from "./style.module.scss";

export const TOOLTIP_ID = "dashboardInfo";

export const CommonTooltip = () => {
  return <Tooltip className={style.toolTip} id={TOOLTIP_ID} place="top" />;
};
