import clsx from "clsx";
import { QRCodeCanvas } from "qrcode.react";

export const Scan = ({
  url,
  className,
}: {
  url?: string;
  className?: string;
}) => {
  if (!url) {
    return null;
  }
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-[8px] w-full h-full",
        className
      )}
    >
      <QRCodeCanvas value={url} size={80} />
    </div>
  );
};
