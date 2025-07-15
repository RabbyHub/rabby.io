import styles from './style.module.scss';
import { useState, useCallback } from 'react';
import clsx from 'clsx';

interface CommentItem {
  url: string;
  avatar: string;
  author: string;
  signature: string;
  content: string;
}

const CommentCard = ({ item }: { item: CommentItem }) => {
  const [isShaking, setIsShaking] = useState(false);

  const goToTweet = () => {
    window.open(item.url)?.focus();
  }

  const handleMouseEnter = useCallback(() => {
    setIsShaking(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsShaking(false);
  }, []);

  return (
    <div
      className={clsx(styles.commentItem, {
        [styles.shakeUpper]: isShaking
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={(e) => {
        // 如果点击的是跳转按钮，不阻止事件
        if (e.target === e.currentTarget || !(e.target as HTMLElement).closest(`.${styles.commentRedirect}`)) {
          // 只有点击非跳转区域时才允许拖拽
          return;
        }
        e.stopPropagation();
      }}
    >
      <div className={styles.commentItemTop}>
        <div className={styles.commentItemTopLeft}>
            <img
                className={styles.commentItemAvatar}
                src={item.avatar}
                alt="avatar"
                width={32}
                height={32}
            />
            <div className={styles.commentItemTopHeader}>
                <div className={styles.commentItemAuthor}>
                    {item.author}
                    <img src="/assets/images/IconVerify.svg" alt="icon" width={16} height={16}/>
                </div>
                <div className={styles.commentItemSignature}>
                {item.signature}
                </div>
            </div>
        </div>
        <div className={styles.commentRedirect}>
          <img 
            src="/assets/images/redirect.svg" 
            alt="redirect" 
            onClick={(e) => {
              e.stopPropagation();
              goToTweet();
            }}
            onMouseDown={(e) => e.stopPropagation()}
          />  
        </div>
      </div>
      <div className={styles.commentItemContent}>
       {item.content}
      </div>
    </div>
  );
};

export default CommentCard;
