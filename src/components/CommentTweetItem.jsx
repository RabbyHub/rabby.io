import clsx from "clsx";
import React, { useEffect, useState } from 'react';
import { Tweet, eagerLoadTwitterLibrary  } from 'react-twitter-widgets';
// eagerLoadTwitterLibrary();


const TWEET_OPTIONS = {
  width: 360,
  conversation: 'none',
  dnt: true,
  cards: 'hidden',
};


const CommentTweetItem = ({ id, options }) => {
  const [hasLoad, setHasLoad] = useState(false);
  const onLoadFn = () => {
    setHasLoad(true);
    console.log('执行加载完成事件', id)
  }

  return (
          <div
            className={clsx(
              "comment-item", {
                'has-load': hasLoad,
              }
            )}
          >
            { !hasLoad && <img src="/assets/images/tweet-default.svg" className={'comment-default-img'} />}
            <Tweet tweetId={id} options={options} onLoad={onLoadFn}/>
          </div>
  );
};

export default CommentTweetItem;
