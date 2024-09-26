import clsx from "clsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from 'react';
import { Tweet } from 'react-twitter-widgets';
// eagerLoadTwitterLibrary();

const CSkeleton = (props) => {
  return (
    <Skeleton
      baseColor="#F2F4F7"
      highlightColor="#FFFFFF"
      duration={1.3}
      borderRadius={4}
      {...props}
    />
  );
};

const LoadingItem = () => {
  return (
    <div className={'loading-container'}>
      <div className={'loading-first'}>
          <CSkeleton circle height={32} width={32} />
          <div className={'loading-column'}>
          <CSkeleton width={104} height={20} />
          <CSkeleton width={76} height={20} />
          </div>
      </div>
      <div className={'loading-column'}>
        <CSkeleton width={266} height={20} />
      </div>
      <div className={'loading-column'}>
        <CSkeleton width={221} height={20} />
      </div>
      <div className={'loading-column'}>
        <CSkeleton width={186} height={20} />
      </div>
      <div className={'loading-column'}>
        <CSkeleton width={247} height={20} />
      </div>
      <div className={'loading-column'}>
        <CSkeleton width={212} height={20} />
      </div>
      <div className={'loading-column'}>
        <CSkeleton width={108} height={20} />
      </div>
    </div>
  );
}

const CommentTweetItem = ({ id, options }) => {
  const [hasLoad, setHasLoad] = useState(false);
  const onLoadFn = () => {
    setHasLoad(true);
  }

  return (
    <div
      className={clsx("comment-item")}
    >
      {!hasLoad && <LoadingItem />}
      <Tweet tweetId={id} options={options} onLoad={onLoadFn} />
    </div>
  );
};

export default CommentTweetItem;
