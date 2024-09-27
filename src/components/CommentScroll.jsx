import React, { useEffect, useState, useRef, useMemo } from "react";
import CommentTweetItem from "./CommentTweetItem";


const TWEET_ID_ARRS = [
  '1764875726950670431',
  '1768414112961437772',
  '1737258777827823871',
  '1769369865293304158',
  '1765419497454764038',
  '1822111943190364263',
  '1808074312173121631',
  '1699871103550636118',
  '1760877143318286481',
  '1753128522598519087',
  '1736197134246908137',
  '1766433217735983351',
  '1773393203946762319',
  '1838832256972132450',
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

const ITEM_WIDTH = TWEET_OPTIONS.width + 24;// 加上padding

const CommentScroll = () => {
  const isHoveredRef = useRef(false);
  const firstLoadNum = Math.ceil(window.innerWidth / ITEM_WIDTH) + 1; // 获取首屏加载推文个数
  const [canLoadAll, setCanLoadAll] = useState(false);
  const list = shuffleArray(TWEET_ID_ARRS);
  const boxRef = useRef(null);
  const currentLoadArrRef = useRef([]);
  const firstLoadId = useMemo(() => list.slice(0, firstLoadNum), [list, firstLoadNum]); // 首屏加载
  const remainingId = useMemo(() => list.slice(firstLoadNum), [list, firstLoadNum]); // 剩下的元素


  useEffect(() => {
    if (!canLoadAll) {
      return;
    }

    const box = boxRef.current;
    let scrollInterval = setInterval(() => {
      if (isHoveredRef.current && canLoadAll) {
        return;
      }

      box.scrollTo({
        left: box.scrollLeft + ITEM_WIDTH,
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
  }, [canLoadAll]);

  const onhasLoadCb = (index) => {
    if (!currentLoadArrRef.current.includes(index)) {
      currentLoadArrRef.current.push(index);

      if (currentLoadArrRef.current.length >= firstLoadNum) {
        setCanLoadAll(true);
      }
    }
  }

  return (
    <div className="comment-container no-padding">
    <div className="comment-title">“Rabby is better in every single way”</div>
    <div 
      className="comment-scroll-list" 
      ref={boxRef}       
      onMouseEnter={() => isHoveredRef.current = true }
      onMouseLeave={() => isHoveredRef.current = false }>
      {firstLoadId.map((id, index) => {
        return (
          <CommentTweetItem id={id} index={index} options={TWEET_OPTIONS} onhasLoadCb={onhasLoadCb}/>
        )
      })}
      {remainingId.map((id, index) => {
        return ( canLoadAll &&
          <CommentTweetItem id={id} index={index} options={TWEET_OPTIONS}/>
        )
      })}
    </div>
    </div>
  );
};

export default CommentScroll;
