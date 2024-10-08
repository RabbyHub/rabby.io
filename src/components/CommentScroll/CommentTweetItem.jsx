import clsx from "clsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from 'react';

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

const CommentTweetItem = ({ item, index, onhasLoadCb, onMouseEnter, onMouseLeave }) => {
  const [hasLoad, setHasLoad] = useState(false);
  const onLoadFn = () => {
    setHasLoad(true);
    onhasLoadCb && onhasLoadCb(index);
  }

  const goToTweet = () => {
    window.open(item.url)?.focus();
  }

  return (
    <div
      onClick={goToTweet}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clsx("comment-item")}
    >
      {!hasLoad && <LoadingItem />}
     {/* <Tweet tweetId={id} options={options} onLoad={onLoadFn} /> */}
      <div className={'comment-item-top'}>
        <img className={'comment-item-avatar'} src={item.avatar} onLoad={onLoadFn} alt="avatar"/>
        <div className={'comment-item-top-right'}>
          <div className={'comment-item-author'}>
          {item.author}
          <img src="/assets/images/IconVerify.svg" alt="icon"/>
          </div>
          <div className={'comment-item-signature'}>
          {item.signature}
          </div>
        </div>
      </div>
      <div className={'comment-item-content'}>
       {item.content}
      </div>
    </div>
  );
};

export default CommentTweetItem;
