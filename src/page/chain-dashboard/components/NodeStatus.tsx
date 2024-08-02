import dayjs from "dayjs";
import { useMemo } from "react";
import style from "./style.module.scss";
import clsx from "clsx";
import { IconDanger, IconNormal, IconWarning } from "./IconStatus";

export function NodeStatusInfo({
  officialNodeHeight,
  officialNodeTimestamp,
  targetNodeHeight,
  isOfficial = false,

  enableShadow = true,
  row = false,
  showNormal = true,
}: {
  isOfficial?: boolean;
  officialNodeHeight: number;
  officialNodeTimestamp: number;
  targetNodeHeight: number;
  enableShadow?: boolean;
  row?: boolean;
  showNormal?: boolean;
}) {
  const { text, status } = useMemo(() => {
    let text = "";
    let status = "normal";
    if (isOfficial) {
      if (
        dayjs.unix(officialNodeTimestamp).isBefore(dayjs().subtract(5, "m"))
      ) {
        status = "danger";
        text = "No blocks mined in the last 5 minutes";
      }
    } else {
      let delayNumber = targetNodeHeight - officialNodeHeight;
      if (delayNumber < 0) delayNumber = 0;
      if (delayNumber > 0 && delayNumber <= 10) {
        status = "warning";
        text = `Delay - ${delayNumber} blocks behind official node`;
      }
      if (delayNumber > 10) {
        status = "danger";
        text = `Delay - ${delayNumber} blocks behind official node`;
      }
    }
    return { text, status };
  }, [isOfficial, officialNodeHeight, officialNodeTimestamp, targetNodeHeight]);

  return (
    <div className={clsx(style.nodeStatusWrapper, row && style.row)}>
      {showNormal && status === "normal" && (
        <IconNormal enableShadow={enableShadow} />
      )}
      {status === "warning" && <IconWarning enableShadow={enableShadow} />}
      {status === "danger" && <IconDanger enableShadow={enableShadow} />}
      {!!text && (
        <span
          className={clsx(
            status === "warning" && style.warning,
            status === "danger" && style.danger
          )}
        >
          {text}
        </span>
      )}
    </div>
  );
}
