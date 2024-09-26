import React, { useEffect, useState, useRef, useMemo } from "react";
import CommentTweetItem from "./CommentTweetItem";
// eagerLoadTwitterLibrary();


const TWEET_ID_ARRS = [
  '1764875726950670431',
  '1768414112961437772',
  '1737258777827823871',
  '1769369865293304158',
  '1765419497454764038',
  '1822111943190364263',
  '1808074312173121631',
  '1699871103550636118',
];

const TWEET_OPTIONS = {
  width: 360,
  conversation: 'none',
  dnt: true,
  cards: 'hidden',
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 生成 0 到 i 的随机索引
    [array[i], array[j]] = [array[j], array[i]]; // 交换元素
  }
  return array;
};

const CommentScroll = () => {
  const isHoveredRef = useRef(false);

  const list = shuffleArray([...TWEET_ID_ARRS,...TWEET_ID_ARRS]);
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    let scrollInterval = setInterval(() => {
      if (isHoveredRef.current) {
        return;
      }

      const scrollWidth = TWEET_OPTIONS.width + 24; // 固定宽度
      box.scrollTo({
        left: box.scrollLeft + scrollWidth,
        behavior: 'smooth',
      });
      if ((box.scrollLeft + 2) >= (box.scrollWidth - box.clientWidth)) {
        setTimeout(() => {
          box.scrollTo({
            left: 0,
            behavior: 'smooth',
          });
        }, 300); // 动画时间稍微比滚动时间短
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="comment-container no-padding">
    <div className="comment-title">“Rabby is better in every single way”</div>
    <div 
      className="comment-scroll-list" 
      ref={boxRef}       
      onMouseEnter={() => isHoveredRef.current = true }
      onMouseLeave={() => isHoveredRef.current = false }>
      {list.map((id, index) => {
        return <CommentTweetItem id={id} index={index} options={TWEET_OPTIONS}/>;
      })}
    </div>
    </div>
  );
};

export default CommentScroll;
