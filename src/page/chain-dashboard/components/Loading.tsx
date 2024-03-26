import Skeleton, { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import style from "./style.module.scss";

export const CSkeleton = (props: SkeletonProps) => {
  return (
    <Skeleton
      baseColor="rgba(190, 190, 190, 0.20)"
      highlightColor="rgba(190, 190, 190, 0.24)"
      duration={1.3}
      {...props}
    />
  );
};
const LoadingItem = () => {
  return (
    <div className={style.column}>
      <div className={style.first}>
        <div className={style.chainInfo}>
          <CSkeleton circle height={24} width={24} />
          <CSkeleton width={120} height={24} />
        </div>
      </div>
      <div className={style.other}>
        <CSkeleton width={100} height={26} />
      </div>
      <div className={style.other}>
        <CSkeleton width={100} height={26} />
      </div>
      <div className={style.other}>
        <CSkeleton width={100} height={26} />
      </div>
    </div>
  );
};

export const Loading = () => {
  return (
    <>
      {Array.from({ length: 10 }, (_, i) => (
        <LoadingItem key={i} />
      ))}
    </>
  );
};
