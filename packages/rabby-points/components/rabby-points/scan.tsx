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
      <div className="flex  items-center justify-center p-[8px] rounded-[8px] border">
        <QRCodeCanvas value={url} size={52} />
      </div>
      <span className="text-[12px] text-[#6A7587]">Scan to download</span>
    </div>
  );
};
