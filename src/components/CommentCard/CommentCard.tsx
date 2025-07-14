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
      onClick={goToTweet}
      className={clsx(styles.commentItem, {
        [styles.shakeUpper]: isShaking
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          <img src="/assets/images/redirect.svg" alt="redirect"/>  
        </div>
      </div>
      <div className={styles.commentItemContent}>
       {item.content}
      </div>
    </div>
  );
};

export default CommentCard;
