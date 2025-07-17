import { useEffect, useState, useRef, useMemo } from "react";  
import CommentTweetItem from "./CommentTweetItem";  
import { COMMENT_RAW_ARRS } from "../CommentCard/constant";  

  
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
  const rawList = shuffleArray(COMMENT_RAW_ARRS);
  const list = useMemo(() => [...rawList, ...rawList], [rawList]); // 克隆一份列表以用于无缝滚动  
  const boxRef = useRef(null);
  const countRef = useRef(0);  
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
      countRef.current ++;
      
      // 检查是否滚动到第二份列表的开始（即原始列表的末尾的复制）  
      if (countRef.current > COMMENT_RAW_ARRS.length) {  
        // 重置滚动位置到第一份列表的开始，但要稍微延迟以确保平滑过渡  
        box.scrollTo({
          left: 0,  
          behavior: 'instant',  
        });  
        countRef.current = 0;
  
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
  
  const onMouseEnter = () => {  
    isHoveredRef.current = true
  }
  
  const onMouseLeave = () => {  
    isHoveredRef.current = false
  }
  
  return (  
    <div className="comment-container">  
      <div className="comment-title">“Rabby is better in every single way”</div>  
    <div 
      className="comment-scroll-list" 
      ref={boxRef}       
    >
      {firstLoadId.map((item, index) => {
        return (
          <CommentTweetItem key={index} item={item} index={index} options={TWEET_OPTIONS} onhasLoadCb={onhasLoadCb} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
        )
      })}
      {remainingId.map((item, index) => {
        return ( canLoadAll &&
          <CommentTweetItem key={index} item={item} index={index} options={TWEET_OPTIONS}  onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
        )
      })}
      </div>  
    </div>  
  );  
};  
  
export default CommentScroll;
